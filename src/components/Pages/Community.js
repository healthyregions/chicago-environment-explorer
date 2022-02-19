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
  
  const filteredData = useMemo(() => {
    if (!(features && features.length) || !currentLocation?.type) {
      return []
    }

    switch(currentLocation.type){
      case 'Zip Code':
        return features.filter(row => row.properties.zip_code === currentLocation.label)
      case 'Community':
        return features.filter(row => row.properties.community === currentLocation.label)
      case 'Census Tract':
        return features.filter(row => row.properties.geoid === currentLocation.label)
      default:
        return []
    }
  },[currentLocation.label, features && features.length])
  
  console.log(filteredData)
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