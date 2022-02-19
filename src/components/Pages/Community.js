import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { 
//   getParseCSV, mergeData, getColumns, loadJson,
//   getDataForBins, getDataForCharts, getDataForLisa, getDateLists,
//   getLisaValues, getCartogramValues, getDateIndices } from '../../utils';

import { loadDataAndBins } from '../../actions';

import { MapSection, StaticNavbar, VariablePanel, Footer,  DataPanel,Popover } from '../../components';  //  Scaleable, Draggable, InfoBox, TopPanel, Preloader,

import { defaultData } from '../../config'; // colorScales, fixedScales, dataPresets, variablePresets, colors, 
import styled from 'styled-components';

import { ContentContainer, Gutter } from '../../styled_components';
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


function App() {
  const {storedGeojson, mapParams } = useSelector(state => state);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchList, setSearchList] = useState([])
  const dispatch = useDispatch();  

  // generate quantile bins based on rank order
  // this is a simplified, but still reasonably accurate method, inline with typical Pandas quantiles
  // It's very fast, and avoids import JsGeoDa, which may be overkill for this dashboard
  const generateBins = async (data, nBins, mapParams) => {
    const length = data.features.length;
    const columnData = data.features.map(row => row[mapParams.numerator][mapParams.nProperty]).sort((a,b) => a - b)
    let bins = [];
    
    for (let i=0; i<nBins; i++){
      bins.push(columnData[Math.round((length/nBins)*i)])
    }

    return bins;
  }

  const handleData = async () => {
    const data = await fetch(`${process.env.PUBLIC_URL}/geojson/${defaultData}`).then(r => r.json());
    const bins = await generateBins(data, 6, mapParams);
    dispatch(loadDataAndBins(data, bins))
    setIsLoading(false)
  }

  useEffect(() => {
    if (!(Object.keys(storedGeojson).length)){
      handleData()
    } else {
        setSearchList(getUniqueList(storedGeojson.features, ['community','zip_code','geoid']));
    }
    if (isLoading) {
      setIsLoading(false)
    }
    // eslint-disable-next-line
  },[])
  
  useEffect(() => {
    if (Object.keys(storedGeojson).length){
        setSearchList(getUniqueList(storedGeojson.features, ['community','zip_code','geoid']));
    }
  },[Object.keys(storedGeojson).length])
  
  return (
    <CommunityPage>
        <StaticNavbar/>
        <ContentContainer>
            <h1>Community</h1>
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
                />
        </ContentContainer>
        <Footer/>
    </CommunityPage>
 );
}

export default App;