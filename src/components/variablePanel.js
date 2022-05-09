import React from "react";
import { useSelector, useDispatch } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ListSubheader from '@mui/material/ListSubheader';

import styled from "styled-components";

// import Tooltip from './tooltip';
import { Gutter } from "../styled_components";
import { changeVariable, setMapParams, setPanelState, toggle3d } from "../actions"; //variableChangeZ, setNotification, storeMobilityData
import { colors, variablePresets, dataDescriptions } from "../config";
import * as SVG from "../config/svg";
import { Button, FormControl } from "@mui/material";
const REDLINING_COLOR_SCALE = {
  A: [115, 169, 77],
  B: [52, 172, 198],
  C: [219, 207, 0],
  D: [226, 77, 90],
};

const RedliningLegend = () => (
  <div style={{ display: "flex", flexDirection: "column", marginTop:'1em' }}>
    <h3>HOLC Grading</h3>
    {Object.entries(REDLINING_COLOR_SCALE).map(([key, color]) => (
      <div style={{ display: "flex", margin:'.25em 0' }}>
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
  max-height: 60vh;
  overflow-y: scroll;
  padding: 20px;

  @media (max-height: 899px) {
    padding: 20px 20px 10vh 20px;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-height: initial;
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

const VariablePanel = (props) => {
  const dispatch = useDispatch();

  const { mapParams, panelState } = useSelector((state) => state);

  const handleMapOverlay = (event) => {
    dispatch(
      setMapParams({
        overlay: event.target.value,
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
        </FormControl>
        <Gutter h={20} />
        {mapParams.custom === 'aq_grid' && <Button onClick={() => dispatch(toggle3d())} sx={{textTransform:'none', mb:1}} variant="outlined" >Toggle 3D Map</Button>}

        <h2>Data Description</h2>
        <p className="data-description">
          {dataDescriptions[mapParams.variableName]}
        </p>

        <Gutter h={20} />
        <h2>Data Overlay</h2>
        <FormControl variant="filled">
          <InputLabel htmlFor="overlay-select">Overlay</InputLabel>
          <Select
            id="overlay-select"
            value={mapParams.overlay}
            onChange={handleMapOverlay}
          >
            <MenuItem value="None" key={"None"}>
              None
            </MenuItem>
            <MenuItem value={"aq"} key={"aq"}>
              Weekly Air Quality 
            </MenuItem>
            <MenuItem value={"community_areas"} key={"community_areas"}>
              Community Areas
            </MenuItem>
            <MenuItem value={"wards"} key={"wards"}>
              Wards
            </MenuItem>
            <MenuItem value={"redlining"} key={"redlining"}>
              Historical Redlining
            </MenuItem>
          </Select>
        </FormControl>
        {mapParams.overlay === "redlining" && <RedliningLegend />}
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
