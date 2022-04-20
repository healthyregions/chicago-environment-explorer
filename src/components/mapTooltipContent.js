import React, { useState } from 'react';
import { Button } from '@mui/material';
import {colors} from '../config'
const PolarSpeciesPlot = React.lazy(() => import('../components/PolarSpeciesPlot.js'));
// This component handles and formats the map tooltip info. 
// The props passed to this component should contain an object of the hovered object (from deck, info.object by default)
const MapTooltipContent = (props) => {
    const [speciesPlotInfo, setSpeciesPlotInfo] = useState({
        open: false,
        geoid: null
    });
    
    const handleSpeciesPlot = () => {
        setSpeciesPlotInfo({
            open: true,
            geoid: +props.content.geoid
        });
    }
    const handleSetOpen = (bool) => {
        setSpeciesPlotInfo(prev =>({
            ...prev,
            open: bool
        }))
    }

    return (
        <>
            <h2>Tract {props.content.geoid}</h2>
            {props.content && <span><table>
                <tr><td>Population</td><td> {props.content.acs_population && props.content.acs_population.toLocaleString('en')}</td></tr>
                <tr><td>Number of Trees</td><td> {props.content.trees_n && props.content.trees_n.toLocaleString('en')}</td></tr>
                <tr><td>Percent Canopy Cover</td><td> {props.content.trees_crown_den && props.content.trees_crown_den.toFixed(2)}%</td></tr>
                <tr><td>Surface Temp Percentile</td><td> {props.content.heatisl && props.content.heatisl.toFixed(2)}</td></tr>
                <tr><td>PM2.5 in Summer (Model Average)</td><td> {props.content.nn_q3_pm2_5 && props.content.nn_q3_pm2_5.toFixed(2)}</td></tr>
                <tr><td>Urban Flood Susceptibility Index</td><td> {props.content.urban_flood_suscep && props.content.urban_flood_suscep.toFixed(2)}</td></tr>
                <tr><td>Logged Traffic Volume</td><td> {props.content.logtraf && props.content.logtraf.toFixed(2)}</td></tr>
                <tr><td>Social Vulnerability Index</td><td> {props.content.svi_pecentile && props.content.svi_pecentile.toFixed(2)}</td></tr>
                <tr><td>Age Adjusted Asthma Cases (Per 10k)</td><td> {props.content.asthma_age_adj_rate && props.content.asthma_age_adj_rate}</td></tr>
                <tr><td>Urban Flood Susceptibility Index</td><td> {props.content.urban_flood_suscep && props.content.urban_flood_suscep.toFixed(2)}</td></tr>
            </table>
            <Button variant="contained" onClick={handleSpeciesPlot} style={{marginTop:'.5em', fontFamily:'"Lato", sans-serif', background:colors.forest}}>Open Species Tree</Button>
            <PolarSpeciesPlot
                geoid={speciesPlotInfo.geoid}
                open={speciesPlotInfo.open}
                setOpen={handleSetOpen}
                />
            </span>}
        </>
    )
}

export default MapTooltipContent