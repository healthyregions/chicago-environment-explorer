import React from "react";
import { useSelector } from "react-redux";
import { fitBounds } from "@math.gl/web-mercator";
import {
  MapSection,
  NavBar,
  VariablePanel,
  Legend,
  DataPanel,
} from "../../components"; 

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

  return (
    <div className="Map-App">
      <NavBar showMapControls={true} bounds={defaultBounds} />
      <div id="mainContainer">
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
