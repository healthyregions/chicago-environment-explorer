// general imports, state
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// deck GL and helper function import
import { MapView, FlyToInterpolator } from "@deck.gl/core";
import {
  TextLayer,
  GeoJsonLayer,
  // GridCellLayer,
  ColumnLayer,
  LineLayer,
} from "@deck.gl/layers"; //, ScatterplotLayer, TextLayer
// import { GridLayer, HexagonLayer } from "@deck.gl/aggregation-layers";
import { CSVLoader } from "@loaders.gl/csv";
// import { GPUGridLayer, HeatmapLayer } from "@deck.gl/aggregation-layers";
import { fitBounds } from "@math.gl/web-mercator";
import MapboxGLMap from "react-map-gl";
import { scaleThreshold } from "d3-scale";
import { DataFilterExtension, FillStyleExtension } from "@deck.gl/extensions";

// component, action, util, and config import
import { MapTooltipContent, Geocoder } from "..";
import { scaleColor } from "../../utils";
import { colors } from "../../config";
import * as SVG from "../../config/svg";
import "mapbox-gl/dist/mapbox-gl.css";
import { useChivesData } from "../../hooks/useChivesData";
import { useChivesWorkerQuery } from "../../hooks/useChivesWorkerQuery";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { useControl } from "react-map-gl";

function DeckGLOverlay(props) {
  const overlay = useControl(() => new MapboxOverlay(props));
  overlay?.setProps(props);
  return null;
}

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const getRightMargin = () =>
  window.innerWidth * 0.15 < 250 ? 260 : window.innerWidth * 0.15 + 10;

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
  left: 14em;
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

function MapSection({ setViewStateFn = () => {}, bounds, geoids = [], showSearch = true, showCustom = false }) {
  // fetch pieces of state from store
  const { storedGeojson } = useChivesData();
  const panelState = useSelector((state) => state.panelState);
  const mapParams = useSelector((state) => state.mapParams);
  const urlParams = useSelector((state) => state.urlParams);
  const filterValues = useSelector((state) => state.filterValues);
  const use3d = useSelector((state) => state.use3d);
  // component state elements
  // hover and highlight geographibes
  const [hoverInfo, setHoverInfo] = useState({
    x: null,
    y: null,
    object: null,
  });
  const [hoverGeog, setHoverGeog] = useState(null);

  const mapRef = useRef(null);

  const handlePanMap = (viewState) => {
    mapRef?.current?.flyTo({
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bearing: viewState.bearing,
      pitch: viewState.pitch,
    });
  };
  const hoverRef = useRef();
  const viewRef = useRef(null);
  const mapContainerRef = useRef(null);
  // map view location
  const [viewState, setViewState] = useState({
    latitude: +urlParams.lat || bounds.latitude,
    longitude: +urlParams.lon || bounds.longitude,
    zoom: +urlParams.z || bounds.zoom,
    bearing: 0,
    pitch: 0,
  });

  const zoom = Math.round(viewState.zoom);
  const mapIsTilted =
    viewRef.current?.bearing !== 0 || viewRef.current?.pitch !== 0;

  useEffect(() => {
    setViewState(bounds);
    handlePanMap(bounds);
  }, [JSON.stringify(bounds)]); //eslint-disable-line

  useEffect(() => {
    setViewStateFn(setViewState);
  }, []); //eslint-disable-line

  useEffect(() => {
    mapContainerRef.current.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  }, []);

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

  useEffect(() => {
    let handler = (e) => {
      if (hoverRef.current && !hoverRef.current.contains(e.target)) {
        setHoverInfo({ x: null, y: null, object: null });
      }
    };
    document.addEventListener("mousedown", handler);
  });
  const GetMapView = () => {
    try {
      const currView = viewRef.current;
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
  const { queryViewport } = useChivesWorkerQuery(deckRef);

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
      const currMapView = GetMapView();
      handlePanMap({
        ...currMapView,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        zoom: 14,
      });
    });
  };

  const handleZoom = (zoom) => {
    const currMapView = GetMapView();
    handlePanMap({
      ...currMapView,
      zoom: currMapView.zoom + zoom,
    });
  };
  const handleTilt = () => {
    const currMapView = GetMapView();
    handlePanMap({
      ...currMapView,
      pitch: 45,
      transitionDuration: 250,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const resetTilt = () => {
    const currMapView = GetMapView();
    handlePanMap({
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

      handlePanMap({
        longitude: center[0],
        latitude: center[1],
        zoom: zoom,
        bearing: 0,
        pitch: 0,
      });
    }
  }, []);

  const COLOR_SCALE = (x) =>
    scaleColor(x, mapParams.bins, mapParams.colorScale);

  const AQ_SCALE = scaleThreshold()
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

  const DISPLACEMENT_COLOR_SCALE = {
    // Displacement Pressure
    '0': [225,225,225],
    'vulnerable, prices not rising': [252,146,114],
    'vulnerable, prices rising':  [222,45,38]
  };

  const CC_COLOR_SCALE = {
    'Chicago Community College': [8,81,156],
    'Community Service Center': [49,130,189],
    'Library': [107,174,214],
    'Park District Spray Feature': [158,202,225],
    'Regional Senior Center': [198,219,239],
    'Satellite Senior Center': [239,243,255]
  };

  const getCcColor = (site_type) => {
    if (site_type in CC_COLOR_SCALE) {
      return CC_COLOR_SCALE[site_type];
    } else {
      return [150,150,150];
    }
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

  const mapAlphaFunc = (feature, color) => {
    const variableName = mapParams.variableName.toLowerCase();
    switch (true) {
      case variableName.includes("plant diversity"):
        return [...color, feature.properties.specCt > 7 ? 255 : 75];
      case variableName.includes("redlining"):
        return (
          REDLINING_COLOR_SCALE[
            feature.properties["primary_grade_4levels"]
          ] || [0, 0, 0]
        );
      case variableName.toLowerCase().includes("displacement index"):
        const indexKey = String(feature.properties["HPRICETIER"]).toLowerCase();
        return (
          DISPLACEMENT_COLOR_SCALE[indexKey] || [
            0, 0, 0,
          ]
        );
      case variableName.toLowerCase().includes("displacement pressure"):
        const pressureKey = String(feature.properties["VUL_PRICE"]).toLowerCase();
        return (
            DISPLACEMENT_COLOR_SCALE[pressureKey] || [
              0, 0, 0,
            ]
        );
      default:
        return color;
    }
  };

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
      beforeId: "water",
    }),
    new GeoJsonLayer({
      id: "choropleth",
      data: storedGeojson,
      pickable: true,
      stroked: false,
      filled: true,
      extruded: false,
      getFillColor: (feature) => {
        if (geoids) {
          if (geoids.includes(+feature.properties.geoid)) {
            return [232, 63, 111];
          }
        }
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
          JSON.stringify(geoids),
        ],
        visible: [geoids.length, mapParams.useCustom],
        getFilterValue: filterValues,
      },
      transitions: {
        getFillColor: 250,
      },
      beforeId: "water",
    }),

    new GeoJsonLayer({
      id: "highlightLayer",
      data: storedGeojson,
      opacity: 0.8,
      material: false,
      pickable: false,
      stroked: true,
      filled: true,
      lineWidthScale: 5,
      getLineColor: (d) =>
        d.properties.geoid === hoverGeog
          ? [65, 182, 230, 255]
          : [100, 100, 100, 0],
      getFillColor: (d) =>
        d.properties.geoid === hoverGeog
          ? [65, 182, 230, 120]
          : [65, 182, 230, 0],
      getLineWidth: 1,
      lineWidthMinPixels: 3,
      visible: geoids.length === 0 && !mapParams.useCustom,
      updateTriggers: {
        getLineColor: [hoverGeog],
        getFillColor: [hoverGeog],
        visible: [geoids.length, mapParams.useCustom],
      },
      transitions: {
        getLineColor: 250,
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
      beforeId: "water",
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
      // material: null,
      getPosition: (d) => [d.x, d.y],
      opacity: 1,
      extruded: use3d,
      getElevation: (d) => d["normalized_median"] - 1,
      getFillColor: (feature) => {
        const val = feature.topline_median;
        return getAqColor(val);
      },
      diskResolution: 8,
      flatShading: true,
      elevationScale: 3000,
      radius: 100,
      visible: mapParams.custom === "aq_grid" && mapParams.useCustom,
      updateTriggers: {
        visible: [mapParams.custom, mapParams.useCustom],
        getFillColor: [mapParams.variableName],
        extruded: use3d,
      },
      beforeId: "water",
    }),
  ];

  const overlayLayers = [

    /* Point data */
    new GeoJsonLayer({
      id: 'cooling-centers',
      data: `${process.env.PUBLIC_URL}/geojson/cooling-centers.geojson`,

      // elevationScale: 1,
      extruded: true,
      filled: true,
      getElevation: 30,
      getFillColor: (feature) => {
        const site_type = feature.properties['site_type'];
        return getCcColor(site_type);
      },
      // getIconAngle: 0,
      // getIconColor: [0, 0, 0, 255],
      // getIconPixelOffset: [0, 0],
      // getIconSize: 1,
      getLineColor: f => {
        const hex = f.properties.color;
        // convert to RGB
        return hex ? hex.match(/[0-9a-f]{2}/g).map(x => parseInt(x, 16)) : [0, 0, 0];
      },
      getLineWidth: 20,
      getPointRadius: 4,
      getText: f => f.properties.name,
      // getTextAlignmentBaseline: 'center',
      // getTextAnchor: 'middle',
      // getTextAngle: 0,
      // getTextBackgroundColor: [255, 255, 255, 255],
      // getTextBorderColor: [0, 0, 0, 255],
      // getTextBorderWidth: 0,
      // getTextColor: [0, 0, 0, 255],
      // getTextPixelOffset: [0, 0],
      getTextSize: 12,
      // iconAlphaCutoff: 0.05,
      // iconAtlas: null,
      // iconBillboard: true,
      // iconMapping: {},
      // iconSizeMaxPixels: Number.MAX_SAFE_INTEGER,
      // iconSizeMinPixels: 0,
      // iconSizeScale: 1,
      // iconSizeUnits: 'pixels',
      // lineBillboard: false,
      // lineCapRounded: false,
      // lineJointRounded: false,
      // lineMiterLimit: 4,
      // lineWidthMaxPixels: Number.MAX_SAFE_INTEGER,
      lineWidthMinPixels: 2,
      // lineWidthScale: 1,
      // lineWidthUnits: 'meters',
      // material: true,
      // pointAntialiasing: true,
      // pointBillboard: false,
      // pointRadiusMaxPixels: Number.MAX_SAFE_INTEGER,
      // pointRadiusMinPixels: 0,
      // pointRadiusScale: 1,
      pointRadiusUnits: 'pixels',
      pointType: 'circle+text',
      stroked: false,
      // textBackground: false,
      // textBackgroundPadding: [0, 0, 0, 0],
      // textBillboard: true,
      // textCharacterSet: [' ', '!', '"', '#', '$', '%', '&', ''', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', ''],
      // textFontFamily: 'Monaco, monospace',
      // textFontSettings: {},
      // textFontWeight: 'normal',
      // textLineHeight: 1,
      // textMaxWidth: -1,
      // textOutlineColor: [0, 0, 0, 255],
      // textOutlineWidth: 0,
      // textSizeMaxPixels: Number.MAX_SAFE_INTEGER,
      // textSizeMinPixels: 0,
      // textSizeScale: 1,
      // textSizeUnits: 'pixels',
      // textWordBreak: 'break-word',
      // wireframe: false,

      /* props inherited from Layer class */

      // autoHighlight: false,
      // coordinateOrigin: [0, 0, 0],
      // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
      // highlightColor: [0, 0, 128, 128],
      // modelMatrix: null,
      // opacity: 1,
      pickable: true,
      // visible: true,
      // wrapLongitude: false,
      visible: mapParams.overlay === "cooling-centers",
      updateTriggers: {
        visible: [mapParams.overlay],
      },
      beforeId: "state-label",
    }),

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
      beforeId: "state-label",
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
      beforeId: "state-label",
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
      beforeId: "state-label",
    }),
    new GeoJsonLayer({
      id: "non-res",
      data: `${process.env.PUBLIC_URL}/geojson/non-res-mdp.geojson`,
      opacity: 1.0,
      material: false,
      pickable: false,
      stroked: true,
      filled: true,
      getFillColor: [200, 200, 200, 255],
      lineWidthScale: 1,
      lineWidthMinPixels: 1,
      lineWidthMaxPixels: 4,
      getLineWidth: 1,
      getLineColor: [150, 150, 150, 100],
      visible: mapParams.overlay === "non-res",
      updateTriggers: {
        visible: [mapParams.overlay],
      },
      beforeId: "state-label",
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
      getSourcePosition: (feature) => [
        feature.longitude,
        feature.latitude,
        feature["topline_median"] * 200 * use3d,
      ],
      getTargetPosition: (feature) => [feature.longitude, feature.latitude, 0],
      getColor: [0, 0, 0],
      getWidth: 1,
      visible: mapParams.overlay === "aq",
      updateTriggers: {
        visible: [mapParams.overlay],
        getSourcePosition: [use3d],
      },
      beforeId: "state-label",
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
      getPosition: (feature) => [
        feature.longitude,
        feature.latitude,
        feature["topline_median"] * 200 * use3d + 1,
      ],
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
        getSize: [zoom],
      },
      beforeId: "state-label",
    }),
  ];

  const allLayers = [...baseLayers, ...customLayers, ...overlayLayers];

  useEffect(() => {
    if (use3d) {
      handleTilt();
    } else {
      resetTilt();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [use3d]);

  const view = new MapView({ repeat: true });

  const getCoolingCenterTooltip = ({object}) => {
    return object && (object.properties.site_name) &&
        (`${object.properties.site_type}: ${object.properties.site_name}\n` +
            (object.properties.address ? object.properties.address + '\n' : '') +
            (object.properties.phone ? object.properties.phone + '\n' : '') +
            (object.properties.hours_of_operation ? object.properties.hours_of_operation : ''));
  }

  return (
    <MapContainer infoPanel={panelState.info} ref={mapContainerRef}>
      <MapboxGLMap
        ref={mapRef}
        mapStyle={
          "mapbox://styles/herop-lab/cloho6j71001s01ns3fna60uj"
        }
        preserveDrawingBuffer={true}
        preventStyleDiffing={true}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
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
        onMove={(e) => {
          queryViewport({
            ...(e?.viewState || {}),
            width: window.innerWidth,
            height: window.innerHeight,
          });
          viewRef.current = e.viewState;

          hoverInfo.object &&
            handleMapClick({ x: null, y: null, object: null });
        }}
        onViewportLoad={(e) => {
          queryViewport({
            ...(e?.viewState || {}),
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }}
        onLoad={(e) => {
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          if (urlParams.has("lat") && urlParams.has("lon")) {
            const center = [+urlParams.get("lon"), +urlParams.get("lat")];
            handleGeocoder({
              center,
            });
          }
        }}
      >
        <DeckGLOverlay
          interleaved={true}
          width={"100%"}
          height={"100%"}
          layers={allLayers}
          getTooltip={getCoolingCenterTooltip}
        />
      </MapboxGLMap>
      {!geoids.length && (
        <MapButtonContainer infoPanel={panelState.info}>
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
              tilted={mapIsTilted}
              onClick={() => resetTilt()}
            >
              {SVG.compass}
            </NavInlineButton>
          </NavInlineButtonGroup>
        </MapButtonContainer>
      )}
      {!geoids.length && showSearch && (
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
            left: hoverInfo.x,
            top: hoverInfo.y,
          }}
          ref={hoverRef}
        >
          <MapTooltipContent content={hoverInfo.object} showCustom={showCustom} />
        </HoverDiv>
      )}
      {!geoids.length && (
        <LogoContainer infoPanel={panelState.info}>
          <a
            href="https://healthyregions.org/"
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
