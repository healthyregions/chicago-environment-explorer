import React from 'react';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';

import {colors, variablePresets} from '../../config';
import {useChivesData} from "../../hooks/useChivesData";
import {useSelector} from "react-redux";
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
    padding:1.75em .5em .25em .5em;
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
        padding:2em 1em 0 1em;
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
    margin:0;
    box-sizing: border-box;
    div.MuiGrid-item {
        padding-top:0;
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
    width:110%;
    display: flex;
    margin-top:0px;
    box-sizing: border-box;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-left: -1.8rem;
    margin-right: 0;
  
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
    margin-top:3px;
    box-sizing: border-box;
    .color-bars {
        width:100%;
        display: flex;
    }
    .color-bars.with-labels {
        margin-bottom: 15px;
    }
    .bin {
        height:5px;
        display: inline;
        flex:1;
        border:0;
        margin:0;
    }
    .bin.min { 
        max-width: 1px;
    }
    .bin.max { 
        max-width: 1px;
        translate: -20px;
    }
    .bin > .label {
        font-size:10px;
        translate: -50%;
        margin-top: 5px;
        text-align: center;
    }
    .bin:nth-of-type(1) {
        transform: ${props => props.firstBinZero ? 'scaleX(0.35)' : 'none'};
    }
`

const BinLabel = ({ label }) => {
    switch(label.trim()) {
        case "Historical Redlining":
            return (
                <BinLabels>
                    <div key={'color-label0'} className='bin labe'>{"A"}</div>
                    <div key={'color-label1'} className='bin labe'>{"B"}</div>
                    <div key={'color-label2'} className='bin labe'>{"C"}</div>
                    <div key={'color-label3'} className='bin labe'>{"D"}</div>
                </BinLabels>
            );
        case "Displacement Pressure":
            return (
                <BinLabels>
                    <div key={'color-label0'} className='bin labe'>{"Not Vulnerable"}</div>
                    <div key={'color-label1'} className='bin labe'>{"Vulnerable, Prices Not Rising"}</div>
                    <div key={'color-label2'} className='bin labe'>{"Vulnerable, Prices Rising"}</div>
                </BinLabels>
            );
        default:
            return null
    }
}

const Legend = ({
    label = '',
    bins = [],
    colorScale = null,
    precision = 2
}) => {
    const { storedGeojson } = useChivesData();
    const mapParams = useSelector((state) => state.mapParams);

    // Note that "label" above and variableName here are similar, but not always the same
    const columnName = variablePresets[mapParams.variableName].Column;

    const values = storedGeojson?.features?.map(f => f.properties[columnName]) || [];

    const min = Math.min(...values.filter(v => Number(v) && !Number.isNaN(v)));
    const max = Math.max(...values.filter(v => Number(v) && !Number.isNaN(v)));

    const categorical = ["Historical Redlining", "Displacement Pressure"].includes(label.trim());

    return (
        <BottomPanel id="bottomPanel">
            {!!bins && !!colorScale && <LegendContainer>
                <Grid container spacing={2} id='legend-bins-container'>
                    <Grid item xs={12}>
                        <LegendTitle>
                            {label || ''}
                        </LegendTitle>
                    </Grid>
                    <Grid item xs={12}>
                        {colorScale !== undefined && !categorical &&
                            <BinBars height={20}>
                                <div className="color-bars with-labels">
                                    <div className="bin min">
                                        <div className="label">{min.toFixed(precision || 2)}</div>
                                    </div>
                                    {colorScale.map((color, i) =>
                                        <div key={'color-bar' + i} className="bin color" style={{backgroundColor:`rgb(${color[0]},${color[1]},${color[2]})`}}>
                                            {i > 0 && <div className="label">{Math.round(bins[i-1]*100)/100}</div>}
                                        </div>
                                    )}
                                    <div className="bin max">
                                        <div className="label">{max.toFixed(precision || 2)}</div>
                                    </div>
                                </div>
                            </BinBars>
                        }
                        <div>
                            {colorScale !== undefined && categorical && <>
                                <BinBars>
                                    <div className="color-bars">
                                        {colorScale.map((color, i) => <div key={'color-bar' + i} className="bin color" style={{backgroundColor:`rgb(${color[0]},${color[1]},${color[2]})`}}></div>)}
                                    </div>
                                </BinBars>
                                <BinLabel label={label}></BinLabel>
                            </>}
                        </div>
                    </Grid>
                </Grid>
            </LegendContainer>}
        </BottomPanel>
    )
}

export default Legend
