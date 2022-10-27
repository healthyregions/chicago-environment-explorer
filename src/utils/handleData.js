import { defaultData } from "../config";
import * as Papa from "papaparse";

export const loadData = async () => {
    const [data, aqTractData, aqLastUpdated] = await Promise.all([
        fetch(
            `${process.env.PUBLIC_URL}/geojson/${defaultData}`
        ).then((r) => r.json()),
        fetch(process.env.REACT_APP_AQ_ENDPOINT + '_tract_readings.csv')
            .then(r => r.text())
            .then(r => Object.assign({}, ...Papa.parse(r, { header: true }).data
            .map(({ Tract, topline_median }) => ({ [Tract]: +topline_median })))
        ),        
        fetch(process.env.REACT_APP_AQ_ENDPOINT + '_timestamp.json')
            .then(r => r.json())
    ])
    
    const mergedData = {
        ...data,
        features: data.features.map((feature) => {
            const { geoid } = feature.properties;
            const topline_median = aqTractData[+geoid]
            return {
                ...feature,
                properties: {
                    ...feature.properties,
                    topline_median
                }
            }
        })
    }
    
    return mergedData
};
