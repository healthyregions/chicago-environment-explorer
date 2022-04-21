const papa = require('papaparse');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const Pbf = require('pbf');
const geobuf = require('geobuf');
const {convert} = require('geojson2shp')

const baseUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTXJJHBZpjjTfJmyUG-UIynDdoRXMHs8wuJzIgRqyi06_mNQQKZZySZ2nfa8bAjrA/pub?output=csv'
const baseSheets = {
    Columns: baseUrl + '&gid=1161403787',
    Variables: baseUrl + '&gid=836973056',
    Sheets: baseUrl + '&gid=1949354290',
    Resources: baseUrl + '&gid=980384336'
}

const fetchAndParse = (url) => fetch(url).then(r => r.text()).then(text => papa.parse(text, { header: true, dynamicTyping: true }).data);

const mergeData = (baseData, dataSheets) => {
    baseData.features.forEach((feature, idx) => {
        const geoid = feature.properties.geoid;
        dataSheets.forEach(externalData => {
            const relatedData = externalData.find(f => +f.geoid === +geoid);
            if (relatedData) {
                feature.properties = {
                    ...relatedData,
                    ...feature.properties
                };
            }
        })
    })
    return baseData
}


const ShpOptions = {
    layer: 'ChiVes-data',
    targetCrs: 4326
}
const writeShp = async (data, shpPath) => {
    await convert(data, shpPath, ShpOptions)
}
const handleVariables = (variables) => {
    const cleanedVariables = variables
        .sort((a, b) => a['Variable Name'].localeCompare(b['Variable Name']))
        .map(variable => ({
            ...variable,
            colorScale: JSON.parse(variable.colorScale),
            variableName: variable['Variable Name']
        }))

    return cleanedVariables
}

async function main() {
    let baseData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'geojson', 'chives-base.geojson'), 'utf8'));
    let [
        columnInfo,
        variables,
        sheetsToFetch,
        resources
    ] = await Promise.all([
        fetchAndParse(baseSheets.Columns),
        fetchAndParse(baseSheets.Variables),
        fetchAndParse(baseSheets.Sheets),
        fetchAndParse(baseSheets.Resources)
    ])
    const dataSheets = await Promise.all(sheetsToFetch.map(sheet => fetchAndParse(sheet['Data Sheet Link'])));
    mergeData(baseData, dataSheets);
    const cleanedVariables = handleVariables(variables)
    const buffer = geobuf.encode(baseData, new Pbf());
    await writeShp(baseData, path.join(__dirname, '..', 'public', 'shp', 'merged-data.zip'))

    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'variables.json'), JSON.stringify(cleanedVariables));
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'columns.json'), JSON.stringify(columnInfo));
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'resources.json'), JSON.stringify(resources));
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'geojson', 'merged-data.geojson'), JSON.stringify(baseData));
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'pbf', 'merged-data.pbf'), buffer);
}

main();