import React from 'react';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';

import { colors } from '../config';
// import { Gutter } from '../styled_components';
// import Tooltip from './tooltip';

const BottomPanel = styled.div`
    position: fixed;
    bottom:0;
    left:50%;
    background:${colors.ivory};
    transform:translateX(-50%);
    width:25vw;
    max-width: 500px;
    box-sizing: border-box;
    padding:0 0 5px 0;
    margin:0;
    box-shadow: 0px 0px 5px ${colors.gray}55;
    border-radius:0.5vh 0.5vh 0 0;
    transition:250ms all;
    color:${colors.black};
    hr {
        opacity:0.5;
    }
    @media (max-width:1024px){
        width:50vw;
        div {
            padding-bottom:5px;
        }
        #binModeSwitch {
            position:absolute !important;
            right: 10px !important;
            top: 10px !important;
        }
        #dateRangeSelector {
            position:absolute !important;
            left: 66% !important;
            transform:translateX(-50%) !important;
            top: 10px !important;
        }
    }

    @media (max-width:768px){

        width:100%;
        max-width:100%;
        padding:0;
        left:0;
        transform:none;
    }
    @media (max-width:750px) and (orientation: landscape) {
        // bottom all the way down for landscape phone
    }
    user-select:none;
`

const LegendContainer = styled.div`
    width:100%;
    padding:10px;
    margin:0;
    box-sizing: border-box;
    div.MuiGrid-item {
        padding:5px 5px 0 5px;
    }
`


const LegendTitle = styled.h3`
    text-align: center;
    font-family:'Roboto', sans-serif;
    padding:0;
    font-weight:bold;
    margin:0;
`

const BinLabels = styled.div`
    width:100%;
    display: flex;
    margin-top:0px;
    box-sizing: border-box;
    padding: 2px 8.3%;
    .bin { 
        height:10px;
        display: inline;
        border:0;
        margin:0;
        flex:2;
        font-size:10px;
        text-align: center;
    }
    .bin:nth-of-type(1) {
        transform: ${props => props.firstBinZero ? 'translateX(-45%)' : 'none'};
    }
    .tooltipText {
        margin-top:-5px;
        padding-bottom:25px;
    }
`
const BinBars = styled.div`
    width:100%;
    display: flex;
    margin-top:3px;
    box-sizing: border-box;
    .bin { 
        height:5px;
        display: inline;
        flex:1;
        border:0;
        margin:0;
    }
    .bin:nth-of-type(1) {
        transform: ${props => props.firstBinZero ? 'scaleX(0.35)' : 'none'};
    }
`


const Legend =  (props) => {
    
    return (
        <BottomPanel id="bottomPanel">
            <LegendContainer>
                <Grid container spacing={2} id='legend-bins-container'>
                    <Grid item xs={12}>
                        <LegendTitle>
                            {props.variableName}
                        </LegendTitle>
                    </Grid>
                    <Grid item xs={12}>
                        {props.colorScale !== undefined &&  
                            <span>
                                <BinBars>
                                    {props.colorScale.map(color => <div className="bin color" key={`${color[0]}${color[1]}`}style={{backgroundColor:`rgb(${color[0]},${color[1]},${color[2]})`}}></div>)}
                                </BinBars>
                                <BinLabels binLength={props.bins.length}> 
                                    {props.bins.slice(1,).map(bin => <div className='bin labe'>{Math.round(bin*100)/100}</div>)}                                   
                                </BinLabels>
                            </span>
                        }
                    </Grid>
                </Grid>
            </LegendContainer>
        </BottomPanel>
    )
}

export default Legend