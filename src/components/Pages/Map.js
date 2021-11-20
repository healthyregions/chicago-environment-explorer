import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { 
//   getParseCSV, mergeData, getColumns, loadJson,
//   getDataForBins, getDataForCharts, getDataForLisa, getDateLists,
//   getLisaValues, getCartogramValues, getDateIndices } from '../../utils';

import { loadDataAndBins } from '../../actions';

import { MapSection, NavBar, VariablePanel, Legend,  
  DataPanel,Popover } from '../../components';  //  Scaleable, Draggable, InfoBox, TopPanel, Preloader,

import { defaultData } from '../../config'; // colorScales, fixedScales, dataPresets, variablePresets, colors, 

function App() {
  const {storedGeojson, mapParams } = useSelector(state => state);
  const [isLoading, setIsLoading] = useState(true);
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
    }
    if (isLoading) {
      setIsLoading(false)
    }
    // eslint-disable-next-line
  },[])
  
  return (
    <div className="Map-App">
      <NavBar />
      {isLoading && <div id="loadingIcon"></div>}
      <div id="mainContainer" className={isLoading ? 'loading' : ''}>
        <MapSection />
        <Legend 
          variableName={mapParams.variableName} 
          colorScale={mapParams.colorScale}
          bins={mapParams.bins}
          />
        <VariablePanel />
        <DataPanel />
        <Popover />    

      </div>
    </div>
  );
}

export default App;