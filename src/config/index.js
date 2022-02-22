export const defaultData = 'tree_sst_master_tracts.geojson';
export const defaultVariable = "Surface Temperature";

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
  "Asthma Prevalence": {
    variableName: "Asthma Prevalence",
    accessor: feature => feature.properties.cities_casthma_prev,
    colorScale: [[0, 32, 81], [43, 68, 110], [105, 105, 112], [148, 143, 120], [202, 186, 106], [253, 234, 69]],
  },
  "Economic Hardship Index": {
    variableName: "Economic Hardship Index",
    accessor: feature => feature.properties.hardship,
    colorScale: [[175, 240, 91], [226, 183, 47], [255, 120, 71], [254, 75, 131], [191, 60, 175], [110, 64, 170]]
  },
  "PM2.5 in Summer (2014-18)": {
    variableName: "PM2.5 in Summer (2014-18)",
    accessor: feature => feature.properties.nn_q3_pm2_5,
    colorScale: [[255,255,229],[254,234,161],[254,186,74],[238,121,24],[183,67,4],[102,37,6]]
  },
  "Population Density": {
    variableName: "Population Density",
    accessor: feature => (feature.properties.acs_population / feature.properties.aland) * 2.59e6,
    colorScale: [[68, 1, 84], [65, 68, 135], [42, 120, 142], [34, 168, 132], [122, 209, 81], [253, 231, 37]]
  },

  "Social Vulnerability Index": {
    variableName: "Social Vulnerability Index",
    accessor: feature => feature.properties.svi_pecentile,
    colorScale: [[0,68,27],[92,173,101],[214,238,209],[228,210,230],[154,109,170],[64,0,75]]
  },

  "Surface Temperature": {
    variableName: "Surface Temperature",
    accessor: feature => feature.properties.heatisl,
    colorScale: [[45, 0, 75], [129, 112, 172], [215, 215, 233], [253, 221, 179], [221, 132, 31], [127, 59, 8]]
  },

  "Traffic Volume": {
    variableName: "Traffic Volume",
    accessor: feature => feature.properties.logtraf,
    colorScale: [[255,247,243],[252,207,204],[249,147,176],[224,62,152],[153,3,124],[73,0,106]]
  },
  "Tree Crown Density": {
    variableName: "Tree Crown Density",
    accessor: feature => feature.properties.trees_crown_den,
    colorScale: [[255, 255, 204], [217, 240, 163], [173, 221, 142], [120, 198, 121], [49, 163, 84], [0, 104, 55]],
  },
  "Urban Flood Susceptibility": {
    variableName: "Urban Flood Susceptibility",
    accessor: feature => feature.properties.urban_flood_suscep,
    colorScale: [[239, 233, 231], [199, 200, 214], [159, 168, 196], [119, 135, 179], [79, 103, 161], [39, 70, 144]],
  },
}

export const dataDescriptions = {
  "Asthma Prevalence": <p>The number of childhood asthma visits for children living in each census tract. Originally, this data was generated at the zip code level, and the City of Chicago
    modeled census tract level data. This measure approximates air-quality related health conditions.
  </p>,
  "Economic Hardship Index": <p>An index calculated from 2018 ACS 5-year data using standard approach using six components (unemployment, dependency, education, income, crowded housing, poverty) by Center for Spatial Data Science.</p>,
  "Population Density":  <p>The number of residents in each census tracts, measured by the population divided by the land area. Presented as person per square mile of city land area.</p>,
  "Urban Flood Susceptibility":  <p>Urban flood susceptibility index, via FEMA and CMAP.</p>,
  'Tree Crown Density': <p>
    This metric describes the amount of tree cover in a given census tract. Data on the location and size of trees was collected by the Chicago Region Trees Initiative 
    in partnership with the U.S. Forest Service. Using LiDAR technology and multiple geoprocessing steps, polygons representing the surface area covered by a tree’s 
    branches and leaves were created. To generate the Tree Crown Density, we  summed the surface area of all trees in a census tract and then divided the total by the 
    surface area of the census tracts. If a given census tract has a tree crown density of 0.5, this translates as <i>“Trees cover 50% of the total surface area in this 
    census tract.”</i> A higher tree crown density means higher tree coverage.
  </p>,
  'PM2.5 in Summer (2014-18)': <p>
    PM 2.5 refers to atmospheric particulate matter (PM) that has a diameter of less than 2.5 micrometers. We used PM 2.5 estimates from EPA sensors in Cook County and 20 neighboring counties as ground truth. To fill in missing gaps between sensors, we generated a model to take advantage of the multivariate relationship between PM 2.5 and aerosol optical depth (a satellite product). Using multiple air quality predictors (such as vegetation, land use, wind speed, temperature, precipitation, aerosol optical depth, point emissions, areal emissions, and more) we estimated PM 2.5 from 2014-2018 at a 1-km resolution using a three-stage model and neural net, replicating previous work and extending it to the local region.  Model performance for this iteration of the model had an R-squared of 0.572 after the first stage with 10-fold cross validation. As the model improves, it will be updated in the tool. 
    <br/><br/>
    For the site selection tool, we cropped the output to the City of Chicago, and aggregated data to the census-tract level; centroids of 1-km grid were assigned to intersecting tracts. We used the average results from Summer 2014-2018, representing peak PM 2.5 trends that occur on a yearly basis, and prepare it as an individual layer.
  </p>,
  'Surface Temperature': <p>
    Some neighborhoods are warmer than others on average, due to complex built and physical environment features, and this is especially pronounced in the summer months. The Urban Heat Island data displays this effect on a map. NASA routinely monitors surface temperatures across the globe by satellites. We used average summer surface temperature in 2018 to rank census tracts in Chicago by average temperature as a proxy for the urban heat island effect. 
    <br/><br/>
    Tracts with indices closer to 1 are the hottest areas in the city. Tracts with indices closer to 0 are the coldest census tracts in the city. Suppose a given census tract (Tract A) has an urban heat island index value of 0.25. This translates as “25% of Chicago census tracts are colder than Tract A.” Note: This also means “75% of Chicago census tracts are warmer than Tract A”. 
  </p>,
  'Traffic Volume': <p>
    This measure corresponds to logged average annual average daily traffic counts by street segment, by census tract. We use recent Illinois Department of Transportation (IDOT) traffic data available as road segments containing Annual Average Daily Traffic (AADT) counts. We cropped the data to the City of Chicago (9,373 road segments), simplified to point locations, and calculated total AADT within each Census Tract. These numbers were subsequently log transformed to normalize the distribution for more meaningful analysis.
  </p>,
  'Social Vulnerability Index': <p>
    Social Vulnerability Index is a composite variable of seven socio-economic indicators that represent an average “rank” of vulnerability, generated by the CDC using American Community Survey 2018 5-year estimates.. The SVI was generated from multiple variables demonstrating including Percent of the population that is dependent (0-4 & 65+), Percent with a bachelor’s degree (negatively weighted), Percent of the population that is White; Not Hispanic (negatively weighted), Unemployment rate, Percent of the population with a disability, Percent of renters that are cost burdened, and Percent of homeowners that are cost burdened. These indicators at the census tract level were transformed, normalized into z-scores, and equally weighted to produce a single estimate. A SVI z-score greater than zero indicates an area is more vulnerable on average than half of the tracts in the study area.  Thus areas with higher scores have more vulnerability.
  </p>,
}
// mapbox API token

export const colors = {
  white: '#ffffff',
  black: '#000000',
  darkgray: '#1a1a1a',
  gray: '#2b2b2b',
  buttongray: '#f5f5f5',
  lightgray: '#d8d8d8',
  yellow: '#FFCE00',
  lightblue: '#A1E1E3',
  purple:'#2d004b',
  red: '#EC1E24',
  strongOrange: '#F16622',
  orange: '#F37E44',
  skyblue: '#c1ebeb',
  blue: '#007bff',
  teal: '#00575c',
  // orange: '#f37e43',
  pink: '#e83e8c',
  ivory: '#fff',
  green: '#97DB4F',
  forest: '#3d6017',
  cartoColors: {
    green: '#49c767',
    gold: '#e0d09d',
    gray: '#c7cfc9',
    slate: '#9db3e0',
    sky: '#9dcee0',
    pink: '#e09dd0',
    spring: '#9de0c3'
  },
  chicagoBlue: '#41B6E6',
  chicagoDarkBlue: '#005899',
  chicagoLightBlue: "#E1F3F8",
  chicagoRed: "#E4002B"
}
