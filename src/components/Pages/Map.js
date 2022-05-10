import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fitBounds } from "@math.gl/web-mercator";
import {
  MapSection,
  NavBar,
  VariablePanel,
  Legend,
  DataPanel,
} from "../../components"; //  Scaleable, Draggable, InfoBox, TopPanel, Preloader,
import { handleData } from "../../utils/handleData";

// US bounds
const defaultBounds = fitBounds({
  width: window.innerWidth,
  height: window.innerHeight,
  bounds: [
    [-87.971649, 41.609282],
    [-87.521896, 42.040624],
  ],
});

function App() {
  const mapParams = useSelector((state) => state.mapParams);
  const [isLoading, setIsLoading] = useState(true);
  // const [viewstateFn, setViewStateFn] = useState(()=>{});
  const dispatch = useDispatch();  
  useEffect(() => {
    handleData(dispatch, mapParams, setIsLoading)
    if (isLoading) {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Map-App">
      <NavBar showMapControls={true} bounds={defaultBounds} />
      {isLoading && <div id="loadingIcon"></div>}
      <div id="mainContainer" className={isLoading ? "loading" : ""}>
        <MapSection bounds={defaultBounds} />
        <Legend
          variableName={`${mapParams.variableName} ${
            mapParams.units ? `(${mapParams.units})` : ""
          }`}
          colorScale={mapParams.colorScale}
          bins={mapParams.bins}
        />
        <VariablePanel />
        <DataPanel />
        {/* <Popover />     */}
      </div>
    </div>
  );
}

export default App;
