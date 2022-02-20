import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { 
//   getParseCSV, mergeData, getColumns, loadJson,
//   getDataForBins, getDataForCharts, getDataForLisa, getDateLists,
//   getLisaValues, getCartogramValues, getDateIndices } from '../../utils';

import { loadDataAndBins } from '../../actions';

import { Gutter, StaticNavbar, VariablePanel, Footer, DataPanel, Popover } from '../../components';  //  Scaleable, Draggable, InfoBox, TopPanel, Preloader,
import useFilterData from '../../hooks/useFilterData';
import useProcessData from '../../hooks/useProcessData';
import { defaultData } from '../../config'; // colorScales, fixedScales, dataPresets, variablePresets, colors, 
import styled from 'styled-components';

import { ContentContainer } from '../../styled_components';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const CommunityPage = styled.div`
    background:white;
`


const typeTranslation = {
  'zip_code': 'Zip Code',
  'community': 'Community',
  'geoid': 'Census Tract'
}

function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

const getUniqueList = (features, cols) => {
  let returnList = [];
  let cacheList = []
  for (let j = 0; j < cols.length; j++) {
    for (let i = 0; i < features.length; i++) {
      const entry = features[i].properties[cols[j]];
      if (!cacheList.includes(entry) && !!entry) {
        cacheList.push(entry)
        returnList.push({
          label: titleCase(entry),
          type: typeTranslation[cols[j]]
        })
      }
    }
  }
  return returnList;
}

const TypeSpan = styled.span`
  font-size: 0.5em;
  font-weight: bold;
  text-transform: uppercase;
  width:10%;
  `

const metricsToParse = [
  {
    name: 'population',
    accessor: (row) => row.properties.acs_population,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length
  },
  {
    name: 'density',
    accessor: (row) => row.properties.acs_population / row.properties.aland,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => (data.accumulated / data.values.length) * 1000
  },
  {
    name: 'treeNumber',
    accessor: (row) => row.properties.trees_area,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length
  },
  {
    name: 'treeDensity',
    accessor: (row) => row.properties.trees_crown_den,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length
  },
  {
    name: 'heatIsland',
    accessor: (row) => row.properties.heatisl,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length
  },
  {
    name: 'pm25',
    accessor: (row) => row.properties.nn_q3_pm2_5,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length
  },
  {
    name: 'traffic',
    accessor: (row) => row.properties.logtraf,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length
  },
  {
    name: 'hardship',
    accessor: (row) => row.properties.hardship,
    accumulator: (prev, curr) => prev + curr,
    reducer: (data) => data.accumulated / data.values.length
  },
]

const columnsToPresent = [
  {
    name: 'Population',
    accessor: (row) => row.population.accumulated,
    vals: (row) => row.population.values,
  },
  {
    name: 'Average Population Density (1,000s of people per square mile)',
    accessor: (row) => row.density.reduced,
    vals: (row) => row.density.values,
  },
  {
    name: 'Average Air Pollution (PM2.5)',
    accessor: (row) => row.pm25.reduced,
    vals: (row) => row.pm25.values,
  },
  {
    name: 'Average Traffic Volume',
    accessor: (row) => row.traffic.reduced,
    vals: (row) => row.traffic.values,
  },
  {
    name: 'Number of Trees',
    accessor: (row) => row.treeNumber.accumulated,
    vals: (row) => row.treeNumber.values,
  },
  {
    name: 'Average Tree Density',
    accessor: (row) => row.treeDensity.reduced,
    vals: (row) => row.treeDensity.values,
  },
  {
    name: 'Average Heat Island Effect',
    accessor: (row) => row.heatIsland.reduced,
    vals: (row) => row.heatIsland.values,
  },
  {
    name: 'Average Economic Hardship Index',
    accessor: (row) => row.hardship.reduced,
    vals: (row) => row.hardship.values,
  },
]

function App() {
  // state mgmt
  const features = useSelector(state => state.storedGeojson?.features) || [];
  const dispatch = useDispatch();
  // data loading
  const handleData = async () => {
    const data = await fetch(`${process.env.PUBLIC_URL}/geojson/${defaultData}`).then(r => r.json());
    dispatch(loadDataAndBins(data))
  }
  useEffect(() => {
    if (!(features && features.length)) {
      handleData()
    }
    // eslint-disable-next-line
  }, [])

  // local state
  const [currentLocation, setCurrentLocation] = useState({});
  const searchList = useMemo(() => {
    if (features && features.length) {
      return getUniqueList(features, ['community', 'zip_code', 'geoid'])
    } else {
      return []
    }
  }, [features && features.length])

  // filter and summary data
  const filterFunc = useMemo(() => currentLocation.type === 'Zip Code'
    ? (f) => f.properties.zip_code === currentLocation.label
    : currentLocation.type === 'Community'
      ? (f) => f.properties.community === currentLocation.label.toUpperCase()
      : (f) => f.properties.geoid === currentLocation.label, [JSON.stringify(currentLocation)]);

  const filteredFeatures = useFilterData({
    data: features,
    filterFunc,
    updateTrigger: currentLocation
  })

  // summarize data
  const [summaries, summariesTimestamp] = useProcessData({
    data: features,
    metrics: metricsToParse,
    updateTrigger: features.length
  })

  const [filteredSummaries, filteredSummariesTimestamp] = useProcessData({
    data: filteredFeatures,
    metrics: metricsToParse,
    updateTrigger: filteredFeatures.length && JSON.stringify(filteredFeatures)
  })

  const transposedData = columnsToPresent.map(({ name, accessor, vals }, id) => ({
    name,
    id,
    chicago: accessor(summaries),
    [currentLocation.label]: accessor(filteredSummaries),
    chicagoVals: vals(summaries),
    [currentLocation.label + 'vals']: vals(filteredSummaries),
  }))

  const columns = [
    { field: 'name', headerName: 'Measure', width: 130 },
    { field: 'chicago', headerName: 'Chicago', width: 70, type: 'number' },
    // { field: currentLocation.label, headerName: `${currentLocation.label}`, width: 70, type: 'number' },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'lastName') || ''
    //     }`,
    // },
  ];

  console.log(transposedData)
  return (
    <CommunityPage>
      <StaticNavbar />
      <ContentContainer>
        <h1>Community</h1>
        <Gutter height="2em" />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={searchList}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Search for your community (zip code, community name, or census tract ID)" />}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <TypeSpan>{option.type}</TypeSpan> {option.label}
            </Box>
          )}
          onChange={(e, value) => setCurrentLocation(value)}
        />
        <DataGrid
          rows={transposedData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </ContentContainer>
      <Footer />
    </CommunityPage>
  );
}

export default App;