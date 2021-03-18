// general imports, state
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {scaleThreshold} from 'd3-scale';
import {WebMercatorViewport} from '@deck.gl/core';

// deck GL and helper function import
import DeckGL from '@deck.gl/react';
import {MapView, FlyToInterpolator} from '@deck.gl/core';
import { GeoJsonLayer, PolygonLayer, ScatterplotLayer, IconLayer, TextLayer } from '@deck.gl/layers';
import {fitBounds} from '@math.gl/web-mercator';
import MapboxGLMap from 'react-map-gl';

// component, action, util, and config import
import { MapTooltipContent, Geocoder } from '../components';
import { setSelectionData } from '../actions';
import { mapFn, dataFn, getVarId, getCSV, getCartogramCenter, getDataForCharts, getURLParams } from '../utils';
import { colors, colorScales, MAPBOX_ACCESS_TOKEN } from '../config';
import MAP_STYLE from '../config/style.json';
import * as SVG from '../config/svg'; 

// US bounds
const bounds = fitBounds({
    width: window.innerWidth,
    height: window.innerHeight,
    bounds: [[-87.971649,41.609282],[-87.521896,42.040624]]
})


// component styling
const MapContainer = styled.div`
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background:${colors.ivory};
    overflow:hidden;
    @media (max-width:600px) {
        div.mapboxgl-ctrl-geocoder {
            display:none;
        }
    }
`

const HoverDiv = styled.div`
    background:${colors.ivory};
    padding:20px;
    color:${colors.black};
    box-shadow: 0px 0px 5px rgba(0,0,0,0.7);
    border-radius:15px;
    h3 {
        margin:5px 0;
    }
    hr {
        margin: 5px 0;
    }
    max-width:50ch;
    line-height:1.5;
    table {
        border-collapse:collapse;
    }
    table tr:nth-of-type(even) {
        background:${colors.lightgray}55;
    }
    table tr td {
        padding:2px 0;
    }
    table tr td:nth-of-type(1) {
        padding-right:10px;
    }
`

const MapButtonContainer = styled.div`
    position: absolute;
    right: ${props => props.infoPanel ? 317 : 10}px;
    bottom: 30px;
    z-index: 10;
    transition: 250ms all;
    @media (max-width:768px) {
        bottom:100px;
    }
    @media (max-width: 400px) {
        transform:scale(0.75) translate(20%, 20%);
    }
`

const NavInlineButtonGroup = styled.div`
    margin-bottom:10px;
    border-radius:4px;
    overflow:hidden;
    -moz-box-shadow: 0 0 2px rgba(0,0,0,.1);
    -webkit-box-shadow: 0 0 2px rgba(0,0,0,.1);
    box-shadow: 0 0 0 2px rgba(0,0,0,.1);
`

const NavInlineButton = styled.button`
    width:29px;
    height:29px;
    padding:5px;
    display:block;
    fill:rgb(60,60,60);
    background-color: ${props => props.isActive ? colors.lightblue : colors.buttongray};
    outline:none;
    border:none;
    transition:250ms all;
    cursor:pointer;
    :after {
        opacity: ${props => props.shareNotification ? 1 : 0};
        content:'Map Link Copied to Clipboard!';
        background:${colors.buttongray};
        -moz-box-shadow: 0 0 2px rgba(0,0,0,.1);
        -webkit-box-shadow: 0 0 2px rgba(0,0,0,.1);
        box-shadow: 0 0 0 2px rgba(0,0,0,.1);
        border-radius: 4px;
        position: absolute;
        transform:translate(-120%, -25%);
        padding:5px;
        width:150px;
        pointer-events:none;
        max-width:50vw;
        transition:250ms all;
    }
    svg {
        transition:250ms all;
        transform:${props => props.tilted ? 'rotate(30deg)' : 'none' };
    }
`

const ShareURL = styled.input`
    position:fixed;
    left:110%;
`

const IndicatorBox = styled.div`
    position:fixed;
    border:1px dashed #FFCE00;
    background:rgba(0,0,0,0.25);
    z-index:5;
`

const GeocoderContainer = styled.div`
    position:fixed;
    right:7px;
    top:7px;
    z-index:500;
    width:250px;
    @media (max-width:600px) {
        display:none;
    }
`

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

//create your forceUpdate hook
function useForceUpdate(){
    const [, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function MapSection(props){ 
    // fetch pieces of state from store    
    const { storedGeojson, panelState, mapParams, urlParams, centroids } = useSelector(state => state);

    // component state elements
    // hover and highlight geographibes
    const [hoverInfo, setHoverInfo] = useState({x:null, y:null, object:null});
    const [highlightGeog, setHighlightGeog] = useState([]);
    const [hoverGeog, setHoverGeog] = useState(null);

    // map view location
    const [viewState, setViewState] = useState({
        latitude: +urlParams.lat || bounds.latitude,
        longitude: +urlParams.lon || bounds.longitude,
        zoom: +urlParams.z || bounds.zoom,
        bearing:0,
        pitch:0
    })

    // share button notification
    const [shared, setShared] = useState(false);
    
    // interaction states
    const [multipleSelect, setMultipleSelect] = useState(false);
    const [boxSelect, setBoxSelect] = useState(false);
    const [boxSelectDims, setBoxSelectDims] = useState({});
    const forceUpdate = useForceUpdate();
    // const [resetSelect, setResetSelect] = useState(null);
    // const [mobilityData, setMobilityData] = useState([]);

    // local data store for parsed data
    const [currentMapData, setCurrentMapData] = useState({
        data: [],
        params: {}
    })

    const dispatch = useDispatch();

    let hidden = null;
    let visibilityChange = null;
    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support 
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
    }

    // shared view broadcast
    useEffect(() => { 
        document.addEventListener(visibilityChange, () => {
            setBoxSelect(false);
            setMultipleSelect(false);
        });

        window.addEventListener('storage', () => {
            // When local storage changes, dump the list to
            // the console.
            const SHARED_GEOID =  localStorage.getItem('SHARED_GEOID').split(',').map(d => parseInt(d))
            
            if (SHARED_GEOID !== null) {
                setHighlightGeog(SHARED_GEOID); 
            }
            
            const SHARED_VIEW =  JSON.parse(localStorage.getItem('SHARED_VIEW'));
            
            if (SHARED_VIEW !== null && SHARED_VIEW.hasOwnProperty('latitude')) {
                setViewState({
                        longitude: SHARED_VIEW.longitude,
                        latitude: SHARED_VIEW.latitude,
                        zoom: SHARED_VIEW.zoom,
                        transitionDuration: 1000,
                        transitionInterpolator: new FlyToInterpolator()
                    })
            }
        });

    },[])
    
    useEffect(() => {
        setViewState(view => ({
            ...view,
            latitude: +urlParams.lat || bounds.latitude,
            longitude: +urlParams.lon || bounds.longitude,
            zoom: +urlParams.z || bounds.zoom,
            bearing:0,
            pitch:0
        }));
    }, [urlParams])

    const GetMapView = () => {
        try {
            const currView = deckRef.current.deck.viewState.MapView
            return currView || {...viewState}
        } catch {
            return {...viewState}
        }
    }
    
    const mapRef = useRef(null);

    const deckRef = useRef({
        deck: {
            viewState: {
                MapView: {
                    ...viewState
                }
            }
        }
    });

    const handleShare = async (params) => {
        const shareData = {
            title: 'The US Covid Atlas',
            text: 'Near Real-Time Exploration of the COVID-19 Pandemic.',
            url: `${window.location.href.split('?')[0]}${getURLParams(params)}`,
        }

        try {
            await navigator.share(shareData)
          } catch(err) {
            let copyText = document.querySelector("#share-url");
            copyText.value = `${shareData.url}`;
            copyText.style.display = 'block'
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
            copyText.style.display = 'none';
            setShared(true)
            setTimeout(() => setShared(false), 5000);
        }
    }

    const handleKeyDown = (e) => {
        if (e.target.selectionStart === undefined){
            if (e.ctrlKey) setMultipleSelect(true);
            if (e.shiftKey) setBoxSelect(true);
        }
    }

    const handleKeyUp = (e) => {
        if (e.target.selectionStart === undefined){
            if (!e.ctrlKey) setMultipleSelect(false);
            if (!e.shiftKey) setBoxSelect(false);
        }
    }

    const handleMapHover = ({x, y, object}) => {
        if (object && object.properties) {
            setHoverGeog(object.properties.geoid)
            setHoverInfo({x, y, object: object.properties})
        } else {
            setHoverGeog(null)
            setHoverInfo({x:null, y:null, object:null})
        }
    }

    const handleMapClick = (info, e) => {
        console.log(e)
    }

    const handleGeolocate = async () => {
        navigator.geolocation.getCurrentPosition( position => {
            setViewState({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    zoom:7,
                    transitionDuration: 1000,
                    transitionInterpolator: new FlyToInterpolator()
                })
        }) 
    }

    const handleZoom = (zoom) => {
        const currMapView = GetMapView()
        setViewState({
                ...currMapView,
                zoom: currMapView.zoom + zoom,
                transitionDuration: 250,
                transitionInterpolator: new FlyToInterpolator()
            })
    }
    
    const resetTilt = () => {
        const currMapView = GetMapView()
        setViewState({
                ...currMapView,
                bearing:0,
                pitch:0,
                transitionDuration: 250,
                transitionInterpolator: new FlyToInterpolator()
            })
    }

    const handleGeocoder = useCallback(location => {
        if (location.center !== undefined) {
            let center = location.center;
            let zoom = 6;

            if (location.bbox) {
                let bounds = fitBounds({
                    width: window.innerWidth,
                    height: window.innerHeight,
                    bounds: [[location.bbox[0],location.bbox[1]],[location.bbox[2],location.bbox[3]]]
                })
                center = [bounds.longitude, bounds.latitude];
                zoom = bounds.zoom*.9;
            };

            setViewState({
                longitude: center[0],
                latitude: center[1],
                zoom: zoom,
                bearing:0,
                pitch:0,
                transitionDuration: 'auto',
                transitionInterpolator: new FlyToInterpolator()
            })
        }  
      }, []);

    const COLOR_SCALE = scaleThreshold()
        .domain(mapParams.bins)
        .range(mapParams.colorScale);

    const layers = [ 
        new GeoJsonLayer({
            id: 'choropleth',
            data: storedGeojson,
            pickable: true,
            stroked: false,
            filled: true,
            extruded: false,
            getFillColor: f => COLOR_SCALE(f[mapParams.numerator][mapParams.nProperty]),
            opacity: 1,
            onHover: handleMapHover,
            // onClick: handleMapClick,            
            updateTriggers: {
                getFillColor: [storedGeojson.type, mapParams.variableName, mapParams.bins, mapParams.colorScale],
            },
            transitions: {
                getFillColor: 250
            }
        }),
        new GeoJsonLayer({
            id: 'highlightLayer',
            data: storedGeojson,
            opacity: 0.8,
            material:false,
            pickable: false,
            stroked: true,
            filled:true,
            lineWidthScale: 5,
            getLineColor: d => d.properties.geoid == hoverGeog ? [0,0,0,255] : [100,100,100,0],
            getFillColor: d => d.properties.geoid == hoverGeog ? [255,255,255,120] : [255,255,255,0],
            getLineWidth:1, 
            lineWidthMinPixels: 3,        
            updateTriggers: {
                getLineColor: [hoverGeog],
                getFillColor: [hoverGeog],
            },
            transitions: {
                getLineColor: 250,
                getFillColor: 250
            }
        }),
    ]

    const view = new MapView({repeat: true});
    const handleSelectionBoxStart = () => {
        setBoxSelect(true)
    }

    const listener = (e) => {

        setBoxSelectDims(prev => {
            let x;
            let y;
            let width;
            let height;

            if (e.clientX < prev.ox) {
                x = e.clientX;
                width = prev.ox - e.clientX
            } else {
                x = prev.x;
                width = e.clientX - prev.x
            }

            if (e.clientY < prev.oy) {
                y = e.clientY;
                height = prev.oy - e.clientY
            } else {
                y = prev.y;
                height = e.clientY - prev.y
            }

            return { ...prev, x, y, width, height }
        })
    }
    
    const touchListener = (e) => {
        // setX(e?.targetTouches[0]?.clientX-15)
        // setY(e?.targetTouches[0]?.clientY-15)
        // console.log(e)
    }

    const removeListeners = () => {
        window.removeEventListener('touchmove', touchListener)
        window.removeEventListener('touchend', removeListeners)
        window.removeEventListener('mousemove', listener)
        window.removeEventListener('mouseup', removeListeners)
        setBoxSelectDims({
            x:-50,
            y:-50,
            ox:0,
            oy:0,
            width:0,
            height:0
        })
        setBoxSelect(false)
    }

    const handleBoxSelect = (e) => {
        try {
            if (e.type === 'mousedown') {
                setBoxSelectDims({
                    x:e.pageX,
                    y:e.pageY,
                    ox:e.pageX,
                    oy:e.pageY,
                    width:0,
                    height:0
                });
                window.addEventListener('touchmove', touchListener);
                window.addEventListener('touchend', removeListeners);
                window.addEventListener('mousemove', listener);
                window.addEventListener('mouseup', removeListeners);
            } else {
    
                const {x, y, width, height } = boxSelectDims;
    
                let layerIds = ['choropleth'];
    
                let features = deckRef.current.pickObjects(
                        {
                            x, y: y-50, width, height, layerIds
                        }
                    )
                let GeoidList = [];
                for (let i=0; i<features.length; i++) {                    
                }
                setHighlightGeog(GeoidList); 
                window.localStorage.setItem('SHARED_GEOID', GeoidList);
                window.localStorage.setItem('SHARED_VIEW', JSON.stringify(GetMapView()));
                setBoxSelectDims({});
                removeListeners();
                setBoxSelect(false)
            }
        } catch {
            console.log('bad selection')
        }
    }
    var myEfficientFn = debounce(function(e) {
        if (centroids.length){
            const viewport = new WebMercatorViewport(e.viewState);          
            const [west,north] = viewport.unproject([0, 0]);
            const [east,south] = viewport.unproject([viewport.width, viewport.height]);

            let returnArray = [];
            for (let i=0; i<centroids.length; i++){
                if (centroids[i].feature.geometry.coordinates[0] < east && 
                    centroids[i].feature.geometry.coordinates[0] > west && 
                    centroids[i].feature.geometry.coordinates[1] > south && 
                    centroids[i].feature.geometry.coordinates[1] < north 
                    ){
                        console.log(centroids[i])
                    }
            }
        }
    }, 500);

    return (
        <MapContainer
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onMouseDown={e => boxSelect ? handleBoxSelect(e) : null}
            onMouseUp={e => boxSelect ? handleBoxSelect(e) : null}
        >
            {
                // boxSelectDims.hasOwnProperty('x') && 
                true && 
                <IndicatorBox style={{
                    left:boxSelectDims.x, 
                    top:boxSelectDims.y, 
                    width: boxSelectDims.width,
                    height: boxSelectDims.height}}
                    />
            }
            <DeckGL
                layers={layers}
                ref={deckRef}

                initialViewState={viewState}
                controller={
                    {
                        dragRotate: !boxSelect, 
                        dragPan: !boxSelect, 
                        doubleClickZoom: !boxSelect, 
                        touchZoom: !boxSelect, 
                        touchRotate: !boxSelect, 
                        keyboard: true, 
                        scrollZoom: true,
                        inertia: 50
                    }
                }
                views={view}
                pickingRadius={20}
                onViewStateChange={(e) => myEfficientFn(e)}
                
            >
                <MapboxGLMap
                    reuseMaps
                    ref={mapRef}
                    mapStyle={'mapbox://styles/lixun910/ckmf5w2e20sn217oiluj5uzd7'} 
                    preventStyleDiffing={true}
                    mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                    >
                </MapboxGLMap >
            </DeckGL>
            <MapButtonContainer 
                infoPanel={panelState.info}
            >
                <NavInlineButtonGroup>
                    <NavInlineButton
                        title="Selection Box"
                        id="boxSelect"
                        isActive={boxSelect}
                        onClick={() => handleSelectionBoxStart()}
                    >
                        {SVG.selectRect}
                    </NavInlineButton>
                </NavInlineButtonGroup>
                <NavInlineButtonGroup>
                    <NavInlineButton
                        title="Geolocate"
                        id="geolocate"
                        onClick={() => handleGeolocate()}
                    >
                        {SVG.locate}
                    </NavInlineButton>
                </NavInlineButtonGroup>
                
                <NavInlineButtonGroup>
                    <NavInlineButton
                    
                        title="Zoom In"
                        id="zoomIn"
                        onClick={() => handleZoom(0.5)}
                    >
                        {SVG.plus}
                    </NavInlineButton>
                    <NavInlineButton
                        title="Zoom Out"
                        id="zoomOut"
                        onClick={() => handleZoom(-0.5)}
                    >
                        {SVG.minus}
                    </NavInlineButton>
                    <NavInlineButton
                        title="Reset Tilt"
                        id="resetTilt"
                        tilted={deckRef.current?.deck.viewState?.MapView?.bearing !== 0 || deckRef.current?.deck.viewState?.MapView?.pitch !== 0}
                        onClick={() => resetTilt()}
                    >
                        {SVG.compass}
                    </NavInlineButton>
                </NavInlineButtonGroup>
                <NavInlineButtonGroup>
                    <NavInlineButton
                        title="Share this Map"
                        id="shareButton"
                        shareNotification={shared}
                        // onClick={() => handleShare({mapParams, dataParams, currentData, coords: GetMapView(), lastDateIndex: dateIndices[currentData][dataParams.numerator]})}
                    >
                        {SVG.share}
                    </NavInlineButton>
                </NavInlineButtonGroup>
                <ShareURL type="text" value="" id="share-url" />
            </MapButtonContainer>
            <GeocoderContainer>
                <Geocoder 
                    id="Geocoder"
                    placeholder={"Search by location"}
                    API_KEY={MAPBOX_ACCESS_TOKEN}
                    onChange={handleGeocoder}
                />
            </GeocoderContainer>

            {hoverInfo.object && (
                <HoverDiv style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: hoverInfo.x, top: hoverInfo.y}}>
                    <MapTooltipContent content={hoverInfo.object} />
                </HoverDiv>
            )}
        </MapContainer>
    ) 
}

export default MapSection