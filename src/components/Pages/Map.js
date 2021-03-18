import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
  getParseCSV, mergeData, getColumns, loadJson,
  getDataForBins, getDataForCharts, getDataForLisa, getDateLists,
  getLisaValues, getCartogramValues, getDateIndices } from '../../utils';

import { loadDataAndBins } from '../../actions';

import { MapSection, NavBar, VariablePanel, Legend,  TopPanel, Preloader,
  DataPanel, Scaleable, Draggable, InfoBox, Popover } from '../../components';  

import { colorScales, fixedScales, dataPresets, variablePresets, colors, defaultData } from '../../config';

function App() {
  const {storedGeojson, mapParams } = useSelector(state => state);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();  

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
    console.log(Object.keys(storedGeojson))
    if (!(Object.keys(storedGeojson).length)){
      console.log('loading data')
      handleData()
    }
  },[])
  
  return (
    <div className="Map-App">
      <Preloader loaded={isLoading} />
      <NavBar />
      {isLoading && <div id="loadingIcon" style={{backgroundImage: `url('${process.env.PUBLIC_URL}assets/img/bw_preloader.gif')`}}></div>}
      <header className="App-header" style={{position:'fixed', left: '20vw', top:'100px', zIndex:10}}>
        {/* <button onClick={() => console.log(fullState)}>Log state</button> */}
      </header>
      <div id="mainContainer" className={isLoading ? 'loading' : ''}>
        <MapSection />
        {/* <TopPanel /> */}
        <Legend 
          variableName={mapParams.variableName} 
          colorScale={mapParams.colorScale}
          bins={mapParams.bins}
          />
        <VariablePanel />
        {/* <DataPanel />
        <Popover />     */}

      </div>
    </div>
  );
}

export default App;