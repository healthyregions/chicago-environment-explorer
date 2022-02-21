import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { 
//   getParseCSV, mergeData, getColumns, loadJson,
//   getDataForBins, getDataForCharts, getDataForLisa, getDateLists,
//   getLisaValues, getCartogramValues, getDateIndices } from '../../utils';

import { loadDataAndBins } from '../../actions';

import { MapSection, NavBar, VariablePanel, Legend,  
  DataPanel,Popover } from '../../components';  //  Scaleable, Draggable, InfoBox, TopPanel, Preloader,
import { generateQuantileBins } from '../../utils';
import { defaultData } from '../../config'; 

function App() {
  const {storedGeojson, mapParams } = useSelector(state => state);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();  

  const handleData = async () => {
    const data = await fetch(`${process.env.PUBLIC_URL}/geojson/${defaultData}`).then(r => r.json());
    const bins = generateQuantileBins(data, 6, mapParams.accessor);
    dispatch(loadDataAndBins(data, bins))
    setIsLoading(false)
  }

  useEffect(() => {
    handleData()
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