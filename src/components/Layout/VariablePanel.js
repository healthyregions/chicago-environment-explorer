import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ListSubheader from '@mui/material/ListSubheader';

import styled from "styled-components";

// import Tooltip from './tooltip';
import { Gutter } from "../../styled_components";
import { changeVariable, setMapParams, setPanelState, toggle3d, toggleCustom } from "../../actions"; //variableChangeZ, setNotification, storeMobilityData
import {colors, variablePresets, dataDescriptions, parsedOverlays} from "../../config";
import * as SVG from "../../config/svg";
import { FormControl, Switch, Stack } from "@mui/material";
import {Link} from "react-router-dom";
const REDLINING_COLOR_SCALE = {
  A: [115, 169, 77],
  B: [52, 172, 198],
  C: [219, 207, 0],
  D: [226, 77, 90],
};

const CC_COLOR_SCALE = {
  'Community Service Center': [8,81,156],
  'Regional Senior Center': [49,130,189],
  'Satellite Senior Center': [107,174,214],
  'Library': [158,202,225],
  'Chicago Community College': [198,219,239],
  'Park District Spray Feature': [239,243,255],
};

const RedliningLegend = () => (
  <div style={{ display: "flex", flexDirection: "column", marginTop:'1em' }}>
    <h3>HOLC Grading</h3>
    {Object.entries(REDLINING_COLOR_SCALE).map(([key, color]) => (
      <div style={{ display: "flex", margin:'.25em 0' }} key={key}>
        <span
          key={key}
          style={{
            backgroundColor: `rgb(${color.join(",")})`,
            width: 16,
            height: 16,
          }}
        ></span>
        <p style={{padding:0, margin:'0 0 0 .25em'}}>Grade {key}</p>
      </div>
    ))}
  </div>
);

const CoolingCentersLegend = () => (
    <div style={{ display: "flex", flexDirection: "column", marginTop:'1em' }}>
      <h3>Cooling Site Types</h3>
      {Object.entries(CC_COLOR_SCALE).map(([key, color]) => (
          <div key={'cc-'+key} style={{ display: "flex", margin:'.25em 0' }}>
        <span
            key={key}
            style={{
              backgroundColor: `rgb(${color.join(",")})`,
              width: 16,
              height: 16,
            }}
        ></span>
            <p style={{padding:0, margin:'0 0 0 .25em'}}>{key}</p>
          </div>
      ))}
    </div>
);

const NonResidentialLegend = () => (
    <div style={{ display: "flex", flexDirection: "column", marginTop:'1em' }}>
      <h3>Industrial Areas</h3>
      <div style={{ display: "flex", margin:'.25em 0' }}>
        <span
            style={{
              backgroundColor: `rgba(200, 200, 200, 255)`,
              borderColor: `rgba(150, 150, 150, 100)`,
              width: 16,
              height: 16,
            }}
        ></span>
            <p style={{padding:0, margin:'0 0 0 .25em'}}>Industrial or Non-Residential Area</p>
      </div>
    </div>
);

const VariablePanelContainer = styled.div`
  position: fixed;
  left: 10px;
  top: 60px;
  height: auto;
  min-width: 200px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 2px 0px 5px ${colors.gray}44;
  border: 1px solid ${colors.green};
  padding: 0;
  box-sizing: border-box;
  transition: 250ms all;
  font: "Roboto", sans-serif;
  color: ${colors.black};
  z-index: 50;
  // border-radius:20px;
  &.hidden {
    transform: translateX(calc(-100% - 20px));
    @media (max-width: 600px) {
      transform: translateX(calc(-100% - 30px));
    }
  }
  h1,
  h2,
  h3,
  h4 {
    font-family: "Roboto", sans-serif;
    margin: 0 0 10px 0;
  }
  p {
    font-family: "Lora", serif;
    margin: 10px 0;
  }
  @media (max-width: 1024px) {
    min-width: 50vw;
  }
  @media (max-width: 600px) {
    width: calc(100% - 1em);
    top: calc(1em + 45px);
    height: calc(100% - 6em);
    left: 0.5em;
    display: ${(props) => (props.otherPanels ? "none" : "initial")};
    padding-top: 2em;
  }
  button#showHideLeft {
    position: absolute;
    left: 95%;
    top: 20px;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    background-color: ${colors.white};
    box-shadow: 2px 0px 5px ${colors.gray}88;
    outline: none;
    border: 1px solid ${colors.green};
    // border-radius:20px;
    cursor: pointer;
    transition: 500ms all;
    svg {
      width: 20px;
      height: 20px;
      margin: 10px 0 0 0;
      @media (max-width: 600px) {
        margin: 5px;
      }
      fill: ${colors.gray};
      transform: rotate(0deg);
      transition: 500ms all;
      .cls-1 {
        fill: none;
        stroke-width: 6px;
        stroke: ${colors.gray};
      }
    }
    :after {
      opacity: 0;
      font-weight: bold;
      content: "Variables";
      color: ${colors.gray};
      position: relative;
      right: -50px;
      top: -22px;
      transition: 500ms all;
      z-index: 4;
    }
    @media (max-width: 768px) {
      top: 120px;
    }
    @media (max-width: 600px) {
      left: calc(100% - 3em);
      width: 3em;
      height: 3em;
      top: 0;
      :after {
        display: none;
      }
    }
  }
  button#showHideLeft.hidden {
    left: calc(100% + 20px);
    @media (max-width: 600px) {
      left: calc(100% + 2.5em);
    }
    svg {
      transform: rotate(90deg);
    }
    :after {
      opacity: 1;
    }
  }
  user-select: none;
`;

const ControlsContainer = styled.div`
  max-height: 80vh;
  overflow-y: scroll;
  padding: 20px;

  @media (max-height: 899px) {
    padding: 20px 20px 10vh 20px;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-height: 100%;
    padding: 0 10px 25vh 10px;
  }
  p.data-description {
    max-width: 40ch;
    line-height: 1.3;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${colors.white};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: url("${process.env.PUBLIC_URL}/icons/grip.png"),
      ${colors.gray}55;
    background-position: center center;
    background-repeat: no-repeat, no-repeat;
    background-size: 50%, 100%;
    transition: 125ms all;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: url("${process.env.PUBLIC_URL}/icons/grip.png"),
      ${colors.darkgray}99;
    background-position: center center;
    background-repeat: no-repeat, no-repeat;
    background-size: 50%, 100%;
  }
`

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const VariablePanel = (props) => {
  const dispatch = useDispatch();

  const mapParams = useSelector((state) => state.mapParams);
  const use3d = useSelector((state) => state.use3d);
  const panelState = useSelector((state) => state.panelState);
  const aqLastUpdated = useSelector((state) => state.aqLastUpdated);

  useEffect(() => {
    // If user selects Displacement Pressure, automatically apply the Non-residential Overlay
    if (mapParams.variableName?.includes('temperature') || mapParams.variableName?.toLowerCase().includes('heat index')) {
      if (!mapParams.overlays?.includes('cooling-centers')) {
        dispatch(setMapParams({ overlays: [ ...mapParams.overlays, 'cooling-centers' ]}));
      }
    }
    // If user selects one of the Heat Indicator variables, automatically apply the Cooling Centers Overlay
    if (mapParams.variableName === 'Displacement Pressure') {
      if (!mapParams.overlays?.includes('non-res')) {
        dispatch(setMapParams({ overlays: [ ...mapParams.overlays, 'non-res' ]}));
      }
    }
  }, [mapParams, dispatch]);

  const handleMapOverlay = (event) => {
    let prevOverlays = mapParams.overlays;
    let overlays = event.target.value;

    // If "None" is clicked, remove all other overlays
    if ((!prevOverlays.includes('None') && overlays.includes('None')) || !overlays.length) {
      overlays = ['None'];
    }

    // If "None" was previously selected and something else is chosen, then de-select "None"
    if (prevOverlays.includes('None') && overlays.find((o) => o !== 'None')) {
      overlays.splice(overlays.indexOf('None'), 1);
    }

    dispatch(
      setMapParams({
        overlay: event.target.value,
        overlays: overlays,
      })
    );
  };

  const handleOpenClose = () => {
    if (panelState.variables) {
      dispatch(setPanelState({ variables: false }));
    } else {
      dispatch(setPanelState({ variables: true }));
    }
  };

  const handleVariable = (e) =>
    dispatch(changeVariable(variablePresets[e.target.value]));

  return (
    <VariablePanelContainer
      className={panelState.variables ? "" : "hidden"}
      otherPanels={panelState.info}
      id="variablePanel"
    >
      <ControlsContainer>
        <h2>Map Variables</h2>
        <FormControl id="newVariableSelect" variant="filled">
          <InputLabel htmlFor="newVariableSelect">Variable</InputLabel>
          <Select
            value={mapParams.variableName}
            onChange={handleVariable}
            MenuProps={{ id: "variableMenu" }}
          >
            {Object.keys(variablePresets).map((variable,i) => (
              variable.includes("HEADER::")
               ? <ListSubheader key={`list-header-${i}`}>{variable.split("HEADER::")[1]}</ListSubheader>
               : <MenuItem value={variable} key={`variable-menu-item-${i}`}>
                {variable}
              </MenuItem>
            ))}
          </Select>
          <div style={{ marginBottom: '10px' }}>
            {mapParams.overlays?.map(overlay => <div  key={'overlay-description-' + overlay}>
              { overlay === 'non-res' && <>+ Non-residential or Industrial Areas</> }
              { overlay === 'cooling-centers' && <>+ Cooling Centers in the Area</> }
              { overlay === 'redlining' && <>+ Historical Redlining</> }
              { overlay === 'wards' && <>+ Area Wards</> }
              { overlay === 'community_areas' && <>+ Community Areas</> }
              { overlay === 'public-housing' && <>+ Public Housing</> }
            </div>)}
          </div>

          <Link to='/builder'>Create a Custom Vulnerability Index using multiple variables</Link>
        </FormControl>
        <Gutter h={20} />
        <h2>Data Description</h2>
        <p className="data-description">
          {mapParams.custom === 'aq_grid' && <>
          <code>Data from {aqLastUpdated.start?.slice(0,10)} to {aqLastUpdated.end?.slice(0,10)} </code>
          </>}

        {mapParams.custom === 'aq_grid' && <>
          <p>
            To see the source data grid, click the switch below.
          </p>
          <Stack direction="row" spacing={1} alignItems="center">

          <p>Aggregated by Tract</p>
          <AntSwitch checked={mapParams.useCustom}  onClick={() => dispatch(toggleCustom())} inputProps={{ 'aria-label': 'ant design' }} />
          <p>Source Data</p>
        </Stack>
          <Stack direction="row" spacing={1} alignItems="center" sx={{opacity: mapParams.useCustom ? 1 : 0.25}}>

          <p>2D Map</p>
          <AntSwitch checked={use3d}  onClick={() => dispatch(toggle3d())} disabled={!mapParams.useCustom} inputProps={{ 'aria-label': 'ant design' }} />
          <p>3D Map</p>
        </Stack>
        </>
        }
          {dataDescriptions[mapParams.variableName]}
        </p>


        <Gutter h={20} />
        <h2>Data Overlay</h2>
        <FormControl variant="filled">
          <InputLabel htmlFor="overlay-select">Overlay</InputLabel>
          <Select
            id="overlay-select"
            value={mapParams.overlays}
            onChange={handleMapOverlay}
            multiple={true}
            style={{ maxWidth: '300px' }}
          >
            <MenuItem value="None" key={"None"}>
              None
            </MenuItem>
            {
              parsedOverlays?.map((overlay) =>
                  <MenuItem value={overlay.id} key={overlay.id}>
                    {overlay.displayName}
                  </MenuItem>
              )
            }
            <MenuItem value={"aq"} key={"aq"}>
              Microsoft PM2.5 Readings
            </MenuItem>
          </Select>
        </FormControl>
        {mapParams.overlays.includes("cooling-centers") && <CoolingCentersLegend />}
        {mapParams.overlays.includes("redlining") && <RedliningLegend />}
        {mapParams.overlays.includes("non-res") && <NonResidentialLegend />}
      </ControlsContainer>
      <button
        onClick={handleOpenClose}
        id="showHideLeft"
        className={panelState.variables ? "active" : "hidden"}
      >
        {SVG.settings}
      </button>
    </VariablePanelContainer>
  );
};

export default VariablePanel;
