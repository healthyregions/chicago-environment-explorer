import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { 
//   getParseCSV, mergeData, getColumns, loadJson,
//   getDataForBins, getDataForCharts, getDataForLisa, getDateLists,
//   getLisaValues, getCartogramValues, getDateIndices } from '../../utils';

import { loadDataAndBins } from '../../actions';

import { Gutter, StaticNavbar, VariablePanel, Footer,  DataPanel,Popover } from '../../components';  //  Scaleable, Draggable, InfoBox, TopPanel, Preloader,

import { defaultData } from '../../config'; // colorScales, fixedScales, dataPresets, variablePresets, colors, 
import styled from 'styled-components';

import { ContentContainer } from '../../styled_components';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, TextField } from '@mui/material';

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
  for (let j=0; j<cols.length;j++){
    for (let i=0; i<features.length; i++){
          const entry = features[i].properties[cols[j]];
          if (!cacheList.includes(entry) && !!entry){
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

const columnsToParse = [
  {
    'col':'',
    op: 'sum'
  },
  {
    'col':'',
    op: 'avg'
  },
  [
    'col':'',
    op:'weightedAvg',
    weight: 'population'
  ]
]

function App() {
  const features = useSelector(state => state.staoredGeojson?.features)||[];
  const [currentLocation, setCurrentLocation] = useState({});
  const [searchList, setSearchList] = useState([])
  const dispatch = useDispatch();  

  const handleData = async () => {
    const data = await fetch(`${process.env.PUBLIC_URL}/geojson/${defaultData}`).then(r => r.json());
    dispatch(loadDataAndBins(data))
  }

  useEffect(() => {
    if (!(features && features.length)){
      handleData()
    } else {
      setSearchList(getUniqueList(features, ['community','zip_code','geoid']));
    }
    // eslint-disable-next-line
  },[])
  
  useEffect(() => {
    if (features && features.length){
        setSearchList(getUniqueList(features, ['community','zip_code','geoid']));
    }
  },[features && features.length])
  
  const [
    filteredFeatures,
    filteredSummary,
    overallSummary
  ] = useMemo(() => {
    if (!(features && features.length) || !currentLocation?.type) {
      return []
    }
    
    const filterFunc = currentLocation.type === 'Zip Code'
      ? (f) => f.properties.zip_code === currentLocation.label
      : currentLocation.type === 'Community'
      ? (f) => f.properties.community === currentLocation.label
      : (f) => f.properties.geoid === currentLocation.label
      
    let filteredSummary = columnsToParse.map(f => ({
      [f.col]: 0
    })).reduce((a,b) => ({...a,...b}),{})

    let overallSummary = columnsToParse.map(f => ({
      [f.col]: 0
    })).reduce((a,b) => ({...a,...b}),{})

    let filteredFeatures = []

    for (let i=0; i<features.length; i++){
      const isFiltered = filterFunc(features[i])
      if (isFiltered){
        filteredFeatures.push(features[i])
      }

      for (let j=0; j<columnsToParse.length; j++){
        const {col, op, weight, label} = columnsToParse[j];
        if (op === 'weightedAvg'){

          overallSummary[label] += features[i].properties[col] * features[i].properties[weight]
          overallSummary[`${label}-weight`] += features[i].properties[weight]
          if (isFiltered){
            filteredSummary[label] += features[i].properties[col] * features[i].properties[weight]
            filteredSummary[`${label}-weight`] += features[i].properties[weight]
          }
        }
        if (op === 'avg' || op === 'sum'){
          filteredSummary[label] += features[i].properties[col]
          if (isFiltered){
            filteredSummary[label] += features[i].properties[col]
          }
        }
        if (i===features.length){
          if (op === 'avg') {
            overallSummary[label] /= features.length
            filteredSummary[label] /= filteredFeatures.length
          }
          if (op === 'weightedAvg'){
            overallSummary[label] /= overallSummary[`${label}-weight`]
            filteredSummary[label] /= filteredSummary[`${label}-weight`]
          }
          }
        }
      }
    }

    return [
      filteredFeatures,
      filteredSummary,
      overallSummary
    ]

  },[currentLocation.label, features && features.length])
  
  return (
    <CommunityPage>
        <StaticNavbar/>
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
        </ContentContainer>
        <Footer/>
    </CommunityPage>
 );
}

export default App;