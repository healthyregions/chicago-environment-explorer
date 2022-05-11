// general imports, state
import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

// deck GL and helper function import
import DeckGL from "@deck.gl/react";
import { WebMercatorViewport, MapView, FlyToInterpolator } from "@deck.gl/core";
import {
  TextLayer,
  GeoJsonLayer,
  GridCellLayer,
  ColumnLayer,
  LineLayer,
} from "@deck.gl/layers"; //, ScatterplotLayer, TextLayer
import { GridLayer, HexagonLayer } from "@deck.gl/aggregation-layers";
import { CSVLoader } from "@loaders.gl/csv";
// import { GPUGridLayer, HeatmapLayer } from "@deck.gl/aggregation-layers";
import { fitBounds } from "@math.gl/web-mercator";
import MapboxGLMap from "react-map-gl";
import { MapboxLayer } from "@deck.gl/mapbox";
import { scaleLinear } from "d3-scale";
import { DataFilterExtension, FillStyleExtension } from "@deck.gl/extensions";

// component, action, util, and config import
import { MapTooltipContent, Geocoder } from "../components";
import { setSelectionData } from "../actions";
import { scaleColor } from "../utils";
import { colors } from "../config";
import * as SVG from "../config/svg";

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const getRightMargin = () =>
  window.innerWidth * 0.15 < 250 ? 260 : window.innerWidth * 0.15 + 10;

const QueryFeaturesWorker = new Worker(
  `${process.env.PUBLIC_URL}/workers/queryRenderedFeaturesWorker.js`
);
// component styling
const MapContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: 250ms all;
  background: ${colors.white};
  overflow: hidden;
  @media (max-width: 600px) {
    div.mapboxgl-ctrl-geocoder {
      display: none;
    }
    width: 100%;
  }
  @media (max-width: 768px) {
    div.mapboxgl-ctrl-bottom-right {
      transform: translateY(-60px);
    }
    div.mapboxgl-ctrl-bottom-left {
      transform: translate(30px, -60px);
    }
  }
`;

const HoverDiv = styled.div`
  background: ${colors.white};
  padding: 20px;
  color: ${colors.black};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
  border-radius: 0 15px 15px 15px;
  h3 {
    margin: 5px 0;
  }
  hr {
    margin: 5px 0;
  }
  max-width: 50ch;
  line-height: 1.5;
  table {
    border-collapse: collapse;
  }
  table tr:nth-of-type(even) {
    background: ${colors.chicagoLightBlue};
  }
  table tr td {
    padding: 2px 0;
  }
  table tr td:nth-of-type(1) {
    padding-right: 10px;
  }
`;

const MapButtonContainer = styled.div`
  position: absolute;
  right: ${(props) =>
    props.infoPanel ? `calc(${getRightMargin()}px)` : "0.75em"};
  bottom: 0;
  z-index: 10;
  transition: 250ms all;
  @media (max-width: 1000px) {
    right: ${(props) => (props.infoPanel ? "35%" : "0.75em")};
  }
  @media (max-width: 768px) {
    bottom: 100px;
  }
  @media (max-width: 400px) {
    transform: scale(0.75) translate(20%, 20%);
  }
  @media (max-width: 600px) {
    right: 0.75em;
  }
`;

const NavInlineButtonGroup = styled.div`
  margin-bottom: 10px;
  border-radius: 4px;
  overflow: hidden;
  -moz-box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
`;

const NavInlineButton = styled.button`
  width: 29px;
  height: 29px;
  padding: 5px;
  display: block;
  fill: rgb(60, 60, 60);
  background-color: ${(props) =>
    props.isActive ? colors.lightblue : colors.buttongray};
  outline: none;
  border: none;
  transition: 250ms all;
  cursor: pointer;
  :after {
    opacity: ${(props) => (props.shareNotification ? 1 : 0)};
    content: "Map Link Copied to Clipboard!";
    background: ${colors.buttongray};
    -moz-box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    position: absolute;
    transform: translate(-120%, -25%);
    padding: 5px;
    width: 150px;
    pointer-events: none;
    max-width: 50vw;
    transition: 250ms all;
  }
  svg {
    transition: 250ms all;
    transform: ${(props) => (props.tilted ? "rotate(30deg)" : "none")};
  }
`;

// const ShareURL = styled.input`
//     position:fixed;
//     left:110%;
// `

// const IndicatorBox = styled.div`
//     position:fixed;
//     border:1px dashed #FFCE00;
//     background:rgba(0,0,0,0.25);
//     z-index:5;
// `

const GeocoderContainer = styled.div`
  position: fixed;
  left: 12em;
  top: 7px;
  z-index: 500;
  width: 230px;
  height: 45px;
  @media (max-width: 600px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  right: ${(props) =>
    props.infoPanel ? `calc(${getRightMargin()}px + 3.5em)` : "3.5em"};
  bottom: 0.75em;
  z-index: 500;
  height: 4em;
  background: white;
  padding: 0.5em 1em;
  border: 1px solid #00e59e;
  transition: 250ms all;
  img {
    height: 100%;
  }
  @media (max-width: 768px) {
    bottom: initial;
    top: 0;
    right: 0;
  }
`;

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function MapSection({ setViewStateFn = () => {}, bounds, geoids = [] }) {
  // fetch pieces of state from store
  const storedGeojson = useSelector((state) => state.storedGeojson);
  const panelState = useSelector((state) => state.panelState);
  const mapParams = useSelector((state) => state.mapParams);
  const urlParams = useSelector((state) => state.urlParams);
  const centroids = useSelector((state) => state.centroids);
  const columnNames = useSelector((state) => state.columnNames);
  const ranges = useSelector((state) => state.ranges);
  const selectionData = useSelector((state) => state.selectionData);
  const filterValues = useSelector((state) => state.filterValues);
  const use3d = useSelector((state) => state.use3d);
  // component state elements
  // hover and highlight geographibes
  const [hoverInfo, setHoverInfo] = useState({
    x: null,
    y: null,
    object: null,
  });
  const [glContext, setGLContext] = useState(null);
  const [hoverGeog, setHoverGeog] = useState(null);
  const [useCustom, setUseCustom] = useState(false)
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null)
  // map view location
  const [viewState, setViewState] = useState({
    latitude: +urlParams.lat || bounds.latitude,
    longitude: +urlParams.lon || bounds.longitude,
    zoom: +urlParams.z || bounds.zoom,
    bearing: 0,
    pitch: 0,
  });
  const zoom = Math.round(viewState.zoom);

  useEffect(() => {
    setViewState(bounds);
  }, [JSON.stringify(bounds)]); //eslint-disable-line

  useEffect(() => {
    setViewStateFn(setViewState);
  }, []); //eslint-disable-line

  const dispatch = useDispatch();
  const RunQueryWorker = async (params) => {
    QueryFeaturesWorker.postMessage(params);
    QueryFeaturesWorker.onmessage = (e) => {
      const result = e?.data;
      // console.log(result)
      if (result) {
        dispatch(setSelectionData(result));
      }
    };
  };

  var queryViewport = debounce((e) => {
    if (!!centroids && centroids.length) {
      const viewport = new WebMercatorViewport(e.viewState);
      const extent = [
        ...viewport.unproject([0, 0]),
        ...viewport.unproject([viewport.width, viewport.height]),
      ];
      RunQueryWorker({
        storedGeojson,
        centroids,
        columnNames,
        extent,
        ranges,
        filterValues,
      });
    }
  }, 250);
  useLayoutEffect(() => {
    if (!Object.keys(selectionData).length) {
      RunQueryWorker({
        storedGeojson,
        centroids,
        columnNames,
        extent: [-100, 100, 100, -100],
        ranges,
        filterValues,
      });
    }
    // eslint-disable-next-line
  }, [
    centroids,
    storedGeojson,
    columnNames,
    ranges,
    selectionData,
    filterValues,
  ]);

  useEffect(() => {
    mapContainerRef.current.addEventListener("contextmenu", (event) => {
      event.preventDefault()
    });
  },[])

  useEffect(() => {
    if (deckRef.current.viewports) {
      queryViewport({ viewState: { ...deckRef.current.viewports[0] } });
    }
    // eslint-disable-next-line
  }, [filterValues]);

  useEffect(() => {
    setViewState((view) => ({
      ...view,
      latitude: +urlParams.lat || bounds.latitude,
      longitude: +urlParams.lon || bounds.longitude,
      zoom: +urlParams.z || bounds.zoom,
      bearing: 0,
      pitch: 0,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams]);

  const GetMapView = () => {
    try {
      const currView = deckRef.current.deck.viewState.MapView;
      return currView || { ...viewState };
    } catch {
      return { ...viewState };
    }
  };

  const deckRef = useRef({
    deck: {
      viewState: {
        MapView: {
          ...viewState,
        },
      },
    },
  });

  const handleMapClick = ({ x, y, object }) => {
    if (object && object.properties) {
      setHoverGeog(object.properties.geoid);
      setHoverInfo({ x, y, object: object.properties });
    } else {
      setHoverGeog(null);
      setHoverInfo({ x: null, y: null, object: null });
    }
  };

  const handleGeolocate = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setViewState({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        zoom: 14,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
      });
    });
  };

  const handleZoom = (zoom) => {
    const currMapView = GetMapView();
    setViewState({
      ...currMapView,
      zoom: currMapView.zoom + zoom,
      transitionDuration: 250,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };
  const handleTilt = () => {
    const currMapView = GetMapView();
    setViewState({
      ...currMapView,
      pitch: 45,
      transitionDuration: 250,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const resetTilt = () => {
    const currMapView = GetMapView();
    setViewState({
      ...currMapView,
      bearing: 0,
      pitch: 0,
      transitionDuration: 250,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const handleGeocoder = useCallback((location) => {
    if (location.center !== undefined) {
      let center = location.center;
      let zoom = 13;

      if (location.bbox) {
        let bounds = fitBounds({
          width: window.innerWidth,
          height: window.innerHeight,
          bounds: [
            [location.bbox[0], location.bbox[1]],
            [location.bbox[2], location.bbox[3]],
          ],
        });
        center = [bounds.longitude, bounds.latitude];
        zoom = bounds.zoom * 0.9;
      }

      setViewState({
        longitude: center[0],
        latitude: center[1],
        zoom: zoom,
        bearing: 0,
        pitch: 0,
        transitionDuration: "auto",
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  }, []);

  // on initial render, navigate to lon/lat if provided
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("lat") && urlParams.has("lon")) {
      const center = [+urlParams.get("lon"), +urlParams.get("lat")];
      handleGeocoder({
        center,
      });
    }
    // eslint-disable-next-line
  }, []);

  const COLOR_SCALE = (x) =>
    scaleColor(x, mapParams.bins, mapParams.colorScale);

  const AQ_SCALE = scaleLinear()
    .domain([5, 7.5, 10, 12, 12.5, 15])
    .range([
      "rgb(1,152,189)",
      "rgb(73,227,206)",
      "rgb(216,254,181)",
      "rgb(254,237,177)",
      "rgb(254,173,84)",
      "rgb(209,55,78)",
    ]);

  const getAqColor = (val) => {
    const color = AQ_SCALE(val);
    return color
      .slice(4, -1)
      .split(",")
      .map((x) => parseInt(x));
  };

  const REDLINING_COLOR_SCALE = {
    A: [115, 169, 77],
    B: [52, 172, 198],
    C: [219, 207, 0],
    D: [226, 77, 90],
  };

  const isVisible = (feature, filters) => {
    for (const property in filters) {
      if (typeof filters[property][0] === "string") {
        if (!filters[property].includes(feature.properties[property]))
          return false;
      } else {
        if (
          feature.properties[property] < filters[property][0] ||
          feature.properties[property] > filters[property][1]
        )
          return false;
      }
    }
    return true;
  };
  // const CONTOURS = [
  //   { threshold: [0, 1], color: [0, 0, 0, 25], strokeWidth: 0, zIndex: 1 }, // => Isoline for threshold 1
  //   { threshold: [1, 4], color: [254, 240, 217], strokeWidth: 0, zIndex: 2 }, // => Isoline for threshold 1
  //   { threshold: [4, 8], color: [253, 204, 138], strokeWidth: 0, zIndex: 3 }, // => Isoline for threshold 5
  //   { threshold: [8, 10], color: [252, 141, 89], strokeWidth: 0, zIndex: 4 }, // => Isoline for threshold 5
  //   { threshold: [10, 15], color: [227, 74, 51], strokeWidth: 0, zIndex: 5 }, // => Isoline for threshold 5
  //   { threshold: [15, 200], color: [179, 0, 0], strokeWidth: 0, zIndex: 6 }, // => Isoline for threshold 5
  // ];
  // const AQ_COL = "weekend_median";

  const mapAlphaFunc = mapParams.variableName
    .toLowerCase()
    .includes("plant diversity")
    ? (feature, color) => [...color, feature.properties.specCt > 7 ? 255 : 75]
    : (_, color) => color;
    
  const baseLayers = [
    new GeoJsonLayer({
      id: "highlighted-geoids",
      data: storedGeojson,
      pickable: false,
      stroked: true,
      filled: true,
      extruded: false,
      getFillColor: [232, 63, 111],
      getLineColor: [0, 0, 0, 120],
      getLineWidth: 1,
      lineWidthMaxPixels: 1,
      lineWidthMinPixels: 1,
      opacity: 0.5,
      getFilterValue: (d) => (geoids.includes(+d.properties.geoid) ? 1 : 0),
      visible: geoids.length === 0 && !mapParams.useCustom,
      filterRange: [1, 1],
      extensions: [new DataFilterExtension({ filterSize: 1 })],
      updateTriggers: {
        getFilterValue: JSON.stringify(geoids),
        visible: [geoids.length, mapParams.useCustom],
      },
      transitions: {
        getFillColor: 250,
      },
    }),
    new GeoJsonLayer({
      id: "choropleth",
      data: storedGeojson,
      pickable: true,
      stroked: false,
      filled: true,
      extruded: false,
      getFillColor: (feature) => {
        const val = mapParams.accessor(feature);
        if ([null, undefined].includes(val)) {
          return [0, 0, 0, 0];
        } else {
          return mapAlphaFunc(feature, COLOR_SCALE(val));
        }
      },
      opacity: 1,
      onClick: handleMapClick,
      getFilterValue: (d) => (isVisible(d, filterValues) ? 1 : 0),
      filterRange: [1, 1],
      extensions: [new DataFilterExtension({ filterSize: 1 })],
      visible: geoids.length === 0 && !mapParams.useCustom,
      updateTriggers: {
        getFillColor: [
          storedGeojson.type,
          mapParams.variableName,
          mapParams.bins,
          mapParams.colorScale,
        ],
        visible: [geoids.length, mapParams.useCustom],
        getFilterValue: filterValues,
      },
      transitions: {
        getFillColor: 250,
      },
    }),
    new GeoJsonLayer({
      id: "parks",
      data: `${process.env.PUBLIC_URL}/geojson/parks.geojson`,
      pickable: false,
      stroked: false,
      filled: true,
      extruded: false,
      getFillColor: [0, 0, 0, 120],
      opacity: 1,
      fillPatternAtlas: `${process.env.PUBLIC_URL}/icons/park-pattern.png`,
      fillPatternMapping: {
        dot: {
          x: 0,
          y: 0,
          width: 128,
          height: 128,
          mask: true,
        },
      },
      getFillPattern: (f) => "dot",
      getFillPatternScale: (19 - GetMapView().zoom) / 8,
      getFillPatternOffset: [0, 0],
      extensions: [new FillStyleExtension({ pattern: true })],
    }),
  ];
  const customLayers = [
    // new HexagonLayer({
    //   id: "aq_data_grid",
    //   data: process.env.REACT_APP_AQ_IDW_ENDPOINT,
    //   loaders: [CSVLoader],
    //   loadOptions: {
    //     csv: {
    //       dynamicTyping: true,
    //       skipEmptyLines: true,
    //       header: true,
    //     },
    //   },
    //   getPosition: (d) => [d.x, d.y],
    //   opacity:1,
    //   colorDomain: [7,12],
    //   colorRange: mapParams.colorScale,
    //   coverage: 0.9,
    //   // extruded: true,
    //   getColorWeight: (d) => d["topline_median"],
    //   colorAggregation: "MEAN",
    //   getElevationWeight: (d) => d["topline_median"],
    //   elevationScale: 10,
    //   elevationAggregation: "MEAN",
    //   elevationDomain: [7, 12],
    //   elevationRange: [0, 1000],
    //   opacity: 0.5,
    //   radius: 500,
    //   // upperPercentile,
    //   // lowerPercentile,
    //   visible: mapParams.custom === 'aq_grid',
    //   updateTriggers: {
    //     visible: [mapParams.custom, mapParams.variableName],
    //   }
    // }),
    new ColumnLayer({
      id: "aq_data_grid",
      data: process.env.REACT_APP_AQ_ENDPOINT + "_processed_data.csv",
      loaders: [CSVLoader],
      loadOptions: {
        csv: {
          dynamicTyping: true,
          skipEmptyLines: true,
          header: true,
        },
      },
      getPosition: (d) => [d.x, d.y],
      opacity: 1,
      extruded: use3d,
      getElevation: (d) => d["normalized_median"] - 1,
      getFillColor: (feature) => {
        const val = feature.topline_median;
        return getAqColor(val);
      },
      elevationScale: 3000,
      opacity: 1,
      radius: 100,
      visible: mapParams.custom === "aq_grid" && mapParams.useCustom,
      updateTriggers: {
        visible: [mapParams.custom, mapParams.useCustom],
        getFillColor: [mapParams.variableName],
        extruded: use3d
      },
    }),
  ];

  const overlayLayers = [
    new GeoJsonLayer({
      id: "redlining areas",
      data: `${process.env.PUBLIC_URL}/geojson/redlining.geojson`,
      opacity: 1,
      material: false,
      pickable: false,
      stroked: false,
      filled: true,
      getFillColor: (d) =>
        REDLINING_COLOR_SCALE[d.properties["holc_grade"]] || [0, 0, 0],
      visible: mapParams.overlay === "redlining",
      updateTriggers: {
        visible: [mapParams.overlay],
      },
    }),
    new GeoJsonLayer({
      id: "community areas",
      data: `${process.env.PUBLIC_URL}/geojson/community_areas.geojson`,
      opacity: 0.8,
      material: false,
      pickable: false,
      stroked: true,
      filled: false,
      lineWidthScale: 1,
      lineWidthMinPixels: 1,
      lineWidthMaxPixels: 4,
      getLineWidth: 1,
      getLineColor: [0, 0, 0, 255],
      visible: mapParams.overlay === "community_areas",
      updateTriggers: {
        visible: [mapParams.overlay],
      },
    }),
    new GeoJsonLayer({
      id: "wards",
      data: `${process.env.PUBLIC_URL}/geojson/boundaries_wards_2015_.geojson`,
      opacity: 0.8,
      material: false,
      pickable: false,
      stroked: true,
      filled: false,
      lineWidthScale: 1,
      lineWidthMinPixels: 1,
      lineWidthMaxPixels: 4,
      getLineWidth: 1,
      getLineColor: [0, 0, 0, 255],
      visible: mapParams.overlay === "wards",
      updateTriggers: {
        visible: [mapParams.overlay],
      },
    }),
    new LineLayer({
      id: "aq-line-layer",
      data: process.env.REACT_APP_AQ_ENDPOINT + "_data_summary.csv",
      loaders: [CSVLoader],
      loadOptions: {
        csv: {
          dynamicTyping: true,
          skipEmptyLines: true,
          header: true,
        },
      },
      getSourcePosition: (feature) => [feature.longitude, feature.latitude, feature["topline_median"]*200*use3d],
      getTargetPosition: (feature) => [feature.longitude, feature.latitude, 0],
      getColor:[0,0,0],
      getWidth: 1,
      visible: mapParams.overlay === "aq",
      updateTriggers: {
        visible: [mapParams.overlay],
        getSourcePosition: [use3d]
      },
    }),
    new TextLayer({
      id: "aq-text-layer",
      data: process.env.REACT_APP_AQ_ENDPOINT + "_data_summary.csv",
      loaders: [CSVLoader],
      loadOptions: {
        csv: {
          dynamicTyping: true,
          skipEmptyLines: true,
          header: true,
        },
      },
      getPosition: (feature) => [feature.longitude, feature.latitude, feature["topline_median"]*200*use3d],
      getText: (feature) =>
        `${Math.round(feature["topline_median"] * 10) / 10}`,
      getSize: zoom ** 2,
      getAngle: 0,
      getTextAnchor: "middle",
      getAlignmentBaseline: "center",
      sizeScale: 0.15,
      background: true,
      backgroundPadding: [5, 0, 5, 0],
      getPixelOffset: [0, -10],
      getBorderColor: [0, 0, 0],
      getBorderWidth: 1,
      visible: mapParams.overlay === "aq",
      updateTriggers: {
        visible: [mapParams.overlay],
        getPosition: [use3d],
        getSize: [zoom]
      },
    }),
  ];
  const allLayers = [...baseLayers, ...customLayers, ...overlayLayers];
  const onMapLoad = useCallback(() => {
    if (mapRef.current === undefined) return;
    const map = mapRef.current.getMap();
    const deck = deckRef.current.deck;
    const layersKeys = allLayers.map((f) => f.props.id);
    for (let i = 0; i < layersKeys.length; i++) {      
      map.addLayer(
        new MapboxLayer({ id: layersKeys[i], deck }), // add layer
        ["community areas", "wards", "aq-text-layer", "aq_data_grid"].includes(
          layersKeys[i]
        )
          ? "water-point-label"
          : "water" // index layer order
      );
    }
  }, []);
  // new GPUGridLayer({
  //     id: 'contour',
  //     data: `${process.env.PUBLIC_URL}/aq_data/aq_data.json`,
  //     colorAggregation: 'MEAN',
  //     getPosition: feature => [feature.Longitude, feature.Latitude],
  //     getColorWeight: feature => feature[AQ_COL],
  //     cellSize: 2000,
  //     contours: CONTOURS
  // }),
  // new HeatmapLayer({
  //     id: 'heatmap1',
  //     data: `${process.env.PUBLIC_URL}/aq_data/aq_data.json`,
  //     aggregation: 'MEAN',
  //     colorRange: [
  //         [254,235,226],
  //         [252,197,192],
  //         [250,159,181],
  //         [247,104,161],
  //         [197,27,138],
  //         [122,1,119],
  //     ],
  //     getPosition: feature => [feature.Longitude, feature.Latitude],
  //     getWeight: feature => feature[AQ_COL],
  //     radiusPixels: 1.3 ** (zoom * 2),
  //     intensity: 0.75,
  //     colorDomain: [5,13]
  // }),
  // new HeatmapLayer({
  //     id: 'heatmap2',
  //     data: `${process.env.PUBLIC_URL}/aq_data/aq_data.json`,
  //     aggregation: 'MEAN',
  //     getPosition: feature => [feature.Longitude, feature.Latitude],
  //     getWeight: feature => feature[AQ_COL],
  //     radiusPixels: 1.65 ** (zoom),
  //     intensity: 0.75,
  //     colorDomain: [9, 11],

  // }),
  // new ScatterplotLayer({
  //     id: 'scatterplot-layer',
  //     data: `${process.env.PUBLIC_URL}/aq_data/aq_data.json`,
  //     pickable: false,
  //     opacity: 0.8,
  //     stroked: false,
  //     radiusUnits: 'pixels',
  //     radiusScale: 1,
  //     radiusMinPixels: 1,
  //     radiusMaxPixels: 100,
  //     getPosition: feature => [feature.Longitude, feature.Latitude],
  //     getRadius: d => zoom,
  //     getFillColor: d => [120, 0, 0],
  // }),
  // ];
  useEffect(() => {
    if (use3d) {
      handleTilt()
    } else {
      resetTilt()
    }
  },[use3d])

  const view = new MapView({ repeat: true });
  return (
    <MapContainer infoPanel={panelState.info} ref={mapContainerRef}>
      <DeckGL
        layers={allLayers}
        ref={deckRef}
        initialViewState={viewState}
        controller={{
          dragRotate: true,
          dragPan: true,
          doubleClickZoom: true,
          touchZoom: true,
          touchRotate: true,
          keyboard: true,
          scrollZoom: true,
          inertia: 100,
        }}
        views={view}
        pickingRadius={20}
        onViewStateChange={(e) => {
          queryViewport(e);
          // if (e?.viewState?.zoom !== e?.oldViewState?.zoom)
          //   setZoom(e.viewState.zoom);
          hoverInfo.object &&
            handleMapClick({ x: null, y: null, object: null });
        }}
        
        glOptions={{ stencil: true }}
        onViewportLoad={queryViewport}
        onWebGLInitialized={setGLContext}
      >
        <MapboxGLMap
          reuseMaps
          ref={mapRef}
          gl={glContext}
          mapStyle={
            "mapbox://styles/csds-hiplab/ckmuv80qn2b6o17ltels6z7ub?fresh=true"
          }
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          onLoad={onMapLoad}
        ></MapboxGLMap>
      </DeckGL>
      {!geoids.length && (
        <MapButtonContainer infoPanel={panelState.info}>
          {/* <NavInlineButtonGroup>
                    <NavInlineButton
                        title="Selection Box"
                        id="boxSelect"
                        isActive={boxSelect}
                        onClick={() => handleSelectionBoxStart()}
                    >
                        {SVG.selectRect}
                    </NavInlineButton>
                </NavInlineButtonGroup> */}
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
              tilted={
                deckRef.current?.deck.viewState?.MapView?.bearing !== 0 ||
                deckRef.current?.deck.viewState?.MapView?.pitch !== 0
              }
              onClick={() => resetTilt()}
            >
              {SVG.compass}
            </NavInlineButton>
          </NavInlineButtonGroup>
          {/* <NavInlineButtonGroup>
                    <NavInlineButton
                        title="Share this Map"
                        id="shareButton"
                        shareNotification={shared}
                        // onClick={() => handleShare({mapParams, dataParams, currentData, coords: GetMapView(), lastDateIndex: dateIndices[currentData][dataParams.numerator]})}
                    >
                        {SVG.share}
                    </NavInlineButton>
                </NavInlineButtonGroup>
                <ShareURL type="text" value="" id="share-url" /> */}
        </MapButtonContainer>
      )}
      {!geoids.length && (
        <GeocoderContainer>
          <Geocoder
            id="Geocoder"
            placeholder={"Search by location"}
            API_KEY={MAPBOX_ACCESS_TOKEN}
            onChange={handleGeocoder}
            height={45}
          />
        </GeocoderContainer>
      )}

      {hoverInfo.object && (
        <HoverDiv
          style={{
            position: "absolute",
            zIndex: 1,
            // pointerEvents: "none",
            left: hoverInfo.x,
            top: hoverInfo.y,
          }}
        >
          <MapTooltipContent content={hoverInfo.object} />
        </HoverDiv>
      )}
      {!geoids.length && (
        <LogoContainer infoPanel={panelState.info}>
          <a
            href="https://herop.ssd.uchicago.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`${process.env.PUBLIC_URL}/herop_dark_logo_teal.png`}
              alt=""
            />
          </a>
        </LogoContainer>
      )}
    </MapContainer>
  );
}

export default MapSection;
