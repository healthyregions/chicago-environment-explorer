import React, { useState } from 'react';
import { Button } from '@mui/material';
import {colors} from '../../config'
const PolarSpeciesPlot = React.lazy(() => import('../Charts/PolarSpeciesPlot.js'));
// This component handles and formats the map tooltip info. 
// The props passed to this component should contain an object of the hovered object (from deck, info.object by default)
const MapTooltipContent = ({content}) => {
    const {
        geoid,
        acs_population,
        trees_n,
        trees_crown_den,
        heatisl,
        nn_q3_pm2_5,
        logtraf,
        svi_pecentile,
        asthma_age_adj_rate, 
        urban_flood_suscep,
        ndvi,
        simpson,
        topline_median
    } = content;
    const [speciesPlotInfo, setSpeciesPlotInfo] = useState({
        open: false,
        geoid: null
    });
    
    const handleSpeciesPlot = () => {
        setSpeciesPlotInfo({
            open: true,
            geoid: +geoid
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
            <h2>Tract {geoid}</h2>
            {content && <span><table>
                <tbody>
                    <tr><td>Population</td><td> {acs_population && acs_population.toLocaleString('en')}</td></tr>
                    <tr><td>Number of Trees</td><td> {trees_n && trees_n.toLocaleString('en')}</td></tr>
                    <tr><td>Percent Canopy Cover</td><td> {trees_crown_den && trees_crown_den.toFixed(2)}%</td></tr>
                    <tr><td>Surface Temp Percentile</td><td> {heatisl && heatisl.toFixed(2)}</td></tr>
                    <tr><td>PM2.5 Weekly Median</td><td> {topline_median && topline_median.toFixed(2)}</td></tr>
                    <tr><td>PM2.5 in Summer (Model Average)</td><td> {nn_q3_pm2_5 && nn_q3_pm2_5.toFixed(2)}</td></tr>
                    <tr><td>Urban Flood Susceptibility Index</td><td> {urban_flood_suscep && urban_flood_suscep.toFixed(2)}</td></tr>
                    <tr><td>Logged Traffic Volume</td><td> {logtraf && logtraf.toFixed(2)}</td></tr>
                    <tr><td>Social Vulnerability Index</td><td> {svi_pecentile && svi_pecentile.toFixed(2)}</td></tr>
                    <tr><td>Childhood Asthma Rate</td><td> {asthma_age_adj_rate && asthma_age_adj_rate}</td></tr>
                    <tr><td>Urban Flood Susceptibility Index</td><td> {urban_flood_suscep && urban_flood_suscep.toFixed(2)}</td></tr>
                    <tr><td>Vegetation Index (NDVI)</td><td> {ndvi && ndvi.toFixed(3)}</td></tr>
                    <tr><td>Plant Biodiversity</td><td>{simpson && simpson.toFixed(2)}</td></tr>
                </tbody>
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