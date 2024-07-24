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
    BaseLayers: baseUrl + '&gid=726550776',
    Sheets: baseUrl + '&gid=1949354290',
    Resources: baseUrl + '&gid=980384336',
    Logos: baseUrl + '&gid=1172783543',
    Categories: baseUrl + '&gid=1634896233'
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
const onlyUnique = (value, index, self) => self.indexOf(value) === index;
const handleVariables = (variables, categories) => {
    const variableCategories = variables.map(v => v.listGroup).filter(onlyUnique).sort((a, b) => a.localeCompare(b));
    const cleanedVariables = variables
        .sort((a, b) => a['Variable Name'].localeCompare(b['Variable Name']))
        .map(variable => ({
            ...variable,
            colorScale: JSON.parse(variable.colorScale),
            bins: JSON.parse(variable.Bins),
            variableName: variable['Variable Name']
        }))
    const combinedVariableTree = variableCategories.sort((a, b) => {
        const categoryA = categories.find(c => c['Category Name'] === a);
        const categoryB = categories.find(c => c['Category Name'] === b);

        const orderA = categoryA['Order'] || -1;
        const orderB = categoryB['Order'] || -1;

        return orderA > orderB ? 1 : (orderA < orderB ? -1 : 0);
    }).map(category =>
            [
                {"HEADER": category},
                ...cleanedVariables.filter(v => v.listGroup === category)
            ]
        ).flat()

    return combinedVariableTree
}

async function main() {
    let baseData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'geojson', 'updated-chives-base.geojson'), 'utf8'));
    let [
        columnInfo,
        variables,
        baseLayers,
        sheetsToFetch,
        resources,
        logos,
        categories
    ] = await Promise.all([
        fetchAndParse(baseSheets.Columns),
        fetchAndParse(baseSheets.Variables),
        fetchAndParse(baseSheets.BaseLayers),
        fetchAndParse(baseSheets.Sheets),
        fetchAndParse(baseSheets.Resources),
        fetchAndParse(baseSheets.Logos),
        fetchAndParse(baseSheets.Categories)
    ])
    const dataSheets = await Promise.all(sheetsToFetch.map(sheet => fetchAndParse(sheet['Data Sheet Link'])));
    mergeData(baseData, dataSheets);
    const cleanedVariables = handleVariables(variables, categories);
    const buffer = geobuf.encode(baseData, new Pbf());
    await writeShp(baseData, path.join(__dirname, '..', 'public', 'shp', 'chives-data.zip'));
    const csvString = papa.unparse(baseData.features.map(f => f.properties));

    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'variables.json'), JSON.stringify(cleanedVariables));
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'columns.json'), JSON.stringify(columnInfo));
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'resources.json'), JSON.stringify(resources));
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'logos.json'), JSON.stringify(logos));
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'categories.json'), JSON.stringify(categories));
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'baseLayers.json'), JSON.stringify(baseLayers));
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'geojson', 'chives-data.geojson'), JSON.stringify(baseData));
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'pbf', 'chives-data.pbf'), buffer);
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'csv', 'chives-data.csv'), csvString);


    // make a separate set of public files for download
    // (is there any need for the other, non-public files created above to exists anyway???)
    const publicFeatures = baseData.features.map(f => {
        columnInfo.forEach( function(c) {
            // update the field names to use Export Name and remove any non-public ones
            if (c['Export Name']) {
                // copy the original field to a new field using the Export name
                f.properties[c['Export Name']] = f.properties[c.Column]
                // delete the original column if its export name is different
               if ( c['Export Name'] != c.Column) {
                delete f.properties[c.Column]
               } 
            } else {
                delete f.properties[c.Column]
            }
        })
        return f
    })
    const publicBaseData = {'type': 'FeatureCollection', 'features': publicFeatures}
    const csvPublicString = papa.unparse(publicBaseData.features.map(f => f.properties));

    await writeShp(publicBaseData, path.join(__dirname, '..', 'public', 'shp', 'chives-data-public.zip'));
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'csv', 'chives-data-public.csv'), csvPublicString);
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'geojson', 'chives-data-public.geojson'), JSON.stringify(publicBaseData));
}

main();
