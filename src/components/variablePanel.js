import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import styled from 'styled-components';

// import Tooltip from './tooltip';
import { StyledDropDown, Gutter } from '../styled_components';
import { changeVariable, setMapParams, setPanelState } from '../actions'; //variableChangeZ, setNotification, storeMobilityData
import { colors, variablePresets, dataDescriptions } from '../config';
import * as SVG from '../config/svg';
import { FormControl, FormHelperText } from '@mui/material';

const VariablePanelContainer = styled.div`
  position:fixed;
  left:10px;
  top:60px;
  height:auto;
  min-width:200px;
  background: rgba( 255, 255, 255, 0.85 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.85 );
  backdrop-filter: blur( 20px );
  -webkit-backdrop-filter: blur( 20px );
  box-shadow: 2px 0px 5px ${colors.gray}44;
  padding:0;
  box-sizing: border-box;
  transition:250ms all;
  font: 'Roboto', sans-serif;
  color:${colors.black};
  z-index:50;
  // border-radius:20px;
  &.hidden {
    transform: translateX(-100%);
    @media (max-width:600px){
      transform: translateX(calc(-100% - 30px));
    }
  }
  h1,h2,h3,h4 {
    font-family: 'Roboto', sans-serif;
    margin: 0 0 10px 0;
  }
  p {
    font-family: 'Lora', serif;
    margin: 10px 0;
  }
  @media (max-width:1024px) {
    min-width:50vw;
  }  
  @media (max-width:600px) {
    width:100%;
    display: ${props => props.otherPanels ? 'none' : 'initial'};
  }
  button#showHideLeft {
    position:absolute;
    left:95%;
    top:20px;
    width:40px;
    height:40px;
    box-sizing:border-box;
    padding:0;
    margin:0;
    background-color: ${colors.white};
    box-shadow: 2px 0px 5px ${colors.gray}88;
    outline:none;
    border:none;
    // border-radius:20px;
    cursor: pointer;
    transition:500ms all;
    svg { 
      width:20px;
      height:20px;
      margin:10px 0 0 0;
      @media (max-width:600px){
        width:20px;
        height:20px;
        margin:5px;
      }
      fill:${colors.gray};
      transform:rotate(0deg);
      transition:500ms all;
      .cls-1 {
        fill:none;
        stroke-width:6px;
        stroke:${colors.gray};
      }
    }
    :after {
      opacity:0;
      font-weight:bold;
      content: 'Variables';
      color:${colors.gray};
      position: relative;
      right:-50px;
      top:-22px;
      transition:500ms all;
      z-index:4;
    }
    @media (max-width:768px){
      top:120px;
    }
    @media (max-width:600px) {
      left:90%;
      width:30px;
      height:30px;
      top:140px;
      :after {
        display:none;
      }
    }
  }
  button#showHideLeft.hidden {
    left:calc(100% + 20px);
    svg {
      transform:rotate(90deg);
    }
    :after {
      opacity:1;
    }
  }
  user-select:none;
`

const ControlsContainer = styled.div`
  max-height:60vh;
  overflow-y:scroll;
  padding:20px;

  @media (max-height:899px){
    padding:20px 20px 10vh 20px;
  }
  
  @media (max-width:600px) {
    width:100%;
    padding:0 10px 25vh 10px;
  }
  p.data-description {
    max-width: 40ch;
    line-height:1.3;
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
    background: url('${process.env.PUBLIC_URL}/icons/grip.png'), ${colors.gray}55;
    background-position: center center;
    background-repeat: no-repeat, no-repeat;
    background-size: 50%, 100%; 
    transition:125ms all;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: url('${process.env.PUBLIC_URL}/icons/grip.png'), ${colors.darkgray}99;
    background-position: center center;
    background-repeat: no-repeat, no-repeat;
    background-size: 50%, 100%; 
  }
`

const VariablePanel = (props) => {

  const dispatch = useDispatch();    

  const { mapParams, panelState } = useSelector(state => state); 

  const handleMapOverlay = (event) =>{
    dispatch(
      setMapParams(
        {
          overlay: event.target.value
        }
      )
    )
  }


  const handleOpenClose = () => {
    if (panelState.variables) {
      dispatch(setPanelState({variables:false}))
    } else {
      dispatch(setPanelState({variables:true}))
    }
  }
  
  const handleVariable = (e) => dispatch(changeVariable(variablePresets[e.target.value]))

  return (
    <VariablePanelContainer className={panelState.variables ? '' : 'hidden'} otherPanels={panelState.info} id="variablePanel">
      <ControlsContainer>
        <h2>Map Variables</h2>
        <FormControl id="newVariableSelect" variant="filled">
          <InputLabel htmlFor="newVariableSelect">Variable</InputLabel>
          <Select
            value={mapParams.variableName}
            onChange={handleVariable}
            MenuProps={{id:'variableMenu'}}
            >
            {Object.keys(variablePresets).map(variable => <MenuItem value={variable} key={variable}>{variable}</MenuItem>)}
          </Select>
        </FormControl>
        <Gutter h={20}/>
        
        <h2>Data Description</h2>
        <p className="data-description">{dataDescriptions[mapParams.variableName]}</p>

        <Gutter h={20}/>
        <h2>Boundary Overlay</h2>
        <FormControl variant="filled">
          <InputLabel htmlFor="overlay-select">Overlay</InputLabel>
          <Select  
            id="overlay-select"
            value={mapParams.overlay}
            onChange={handleMapOverlay}
          >
            <MenuItem value="None" key={'None'}>None</MenuItem> 
            <MenuItem value={'community_areas'} key={'community_areas'}>Community Areas</MenuItem>
            <MenuItem value={'wards'} key={'wards'}>Wards</MenuItem>
          </Select>
        </FormControl>

      </ControlsContainer>
      <button onClick={handleOpenClose} id="showHideLeft" className={panelState.variables ? 'active' : 'hidden'}>{SVG.settings}</button>
    </VariablePanelContainer>
  );
}

export default VariablePanel;