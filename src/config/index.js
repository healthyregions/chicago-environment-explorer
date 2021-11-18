import { pink } from "@material-ui/core/colors";

export const defaultData = 'tree_sst_master_tracts.geojson';

export const dataPresets = {
    'tree_sst_master_tracts.geojson': {
        plainName: 'Tract Level Tree Data', // Plain english name for dataset
        geojson: 'tree_sst_master_tracts.geojson', // geospatial data to join to
        csvs: [],  // list of CSVs to join
        tableNames: [], // table names in order of CSVs
        joinCols: ['GEOID'], // geospatial data join column and then list of valid table join columns
        accumulate: [], // CSV names to accumulate over time
        dateList: {} // date lists to parse: isoDateList (eg. '2020-01-01') or usDateList (eg. '01/01/20')
    }
}

export const tooltipInfo = {
};

export const variablePresets = {
    "Tree Crown Density": {
        variableName:"Tree Crown Density",
        numerator: 'properties',
        nType: 'charactertistic',
        nRange: null,
        nProperty: 'trees_crown_den',
        denominator: 'properties',
        dType: null,
        dProperty: null,
        dRange:null,
        dIndex:null,
        scale:1,
        scale3D: 100,
        fixedScale: null,
        colorScale: [
          [255,255,204],
          [217,240,163],
          [173,221,142],
          [120,198,121],
          [49,163,84],
          [0,104,55]
        ],
    },
    
    "PM2.5 in Summer (2014-18)": {
        variableName:"PM2.5 in Summer (2014-18)",
        numerator: 'properties',
        nType: 'charactertistic',
        nRange: null,
        nProperty: 'nn_q3_pm2_5',
        denominator: 'properties',
        dType: null,
        dProperty: null,
        dRange:null,
        dIndex:null,
        scale:1,
        scale3D: 100,
        fixedScale: null,
        colorScale: null,
        colorScale: [
          [247,247,247],
          [217,217,217],
          [189,189,189],
          [150,150,150],
          [99,99,99],
          [37,37,37],
        ],
    },
    
    "Surface Temperature": {
        variableName:"Surface Temperature",
        numerator: 'properties',
        nType: 'charactertistic',
        nRange: null,
        nProperty: 'heatisl',
        denominator: 'properties',
        dType: null,
        dProperty: null,
        dRange:null,
        dIndex:null,
        scale:1,
        scale3D: 100,
        fixedScale: null,
        colorScale: null,
        colorScale: [
          [255,255,178],
          [254,217,118],
          [254,178,76],
          [253,141,60],
          [240,59,32],
          [189,0,38],
        ],
    },

    "Traffic Volume": {
        variableName:"Traffic Volume",
        numerator: 'properties',
        nType: 'charactertistic',
        nRange: null,
        nProperty: 'logtraf',
        denominator: 'properties',
        dType: null,
        dProperty: null,
        dRange:null,
        dIndex:null,
        scale:1,
        scale3D: 100,
        fixedScale: null,
        colorScale: null,
        colorScale: [
          [241,238,246],
          [212,185,218],
          [201,148,199],
          [223,101,176],
          [221,28,119],
          [152,0,67]
        ],
    },

    "Social Vulnerability Index": {
        variableName:"Social Vulnerability Index",
        numerator: 'properties',
        nType: 'charactertistic',
        nRange: null,
        nProperty: 'svi_pecentile',
        denominator: 'properties',
        dType: null,
        dProperty: null,
        dRange:null,
        dIndex:null,
        scale:1,
        scale3D: 100,
        fixedScale: null,
        colorScale: null,
        colorScale: [
          [246,239,247],
          [208,209,230],
          [166,189,219],
          [103,169,207],
          [28,144,153],
          [1,108,89],
        ],
    },
}

export const fixedScales = {
}

// mapbox API token

export const colors = {
    white: '#ffffff',
    black: '#000000',
    darkgray:'#1a1a1a',
    gray:'#2b2b2b',
    buttongray: '#f5f5f5',
    lightgray: '#d8d8d8',
    yellow: '#FFCE00',
    lightblue: '#A1E1E3',
    red: '#EC1E24',
    strongOrange: '#F16622',
    orange:'#F37E44',
    skyblue: '#c1ebeb',
    blue: '#007bff',
    teal: '#00575c',
    // orange: '#f37e43',
    pink: '#e83e8c',
    ivory: '#fff',
    green:'#97DB4F',
    cartoColors: {
      green:'#49c767',
      gold:'#e0d09d',
      gray:'#c7cfc9',
      slate:'#9db3e0',
      sky:'#9dcee0',
      pink:'#e09dd0',
      spring:'#9de0c3'
    },
    chicagoBlue: '#41B6E6',
    chicagoDarkBlue: '#005899',
    chicagoLightBlue: "#E1F3F8",
    chicagoRed: "#E4002B",
    onionGreen: '#718c1f',
    alliumPink: "#dd7f96"
}
