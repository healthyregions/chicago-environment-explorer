const papa = require('papaparse');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const Pbf = require('pbf');
const geobuf = require('geobuf');
const {convert} = require('geojson2shp');
const yaml = require("yaml");

// Set to true for more verbose logging
const DEBUG = false;

const baseUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTXJJHBZpjjTfJmyUG-UIynDdoRXMHs8wuJzIgRqyi06_mNQQKZZySZ2nfa8bAjrA/pub?output=csv'
const baseSheets = {
    Columns: baseUrl + '&gid=1161403787',
    Variables: baseUrl + '&gid=836973056',
    BaseLayers: baseUrl + '&gid=726550776',
    Sheets: baseUrl + '&gid=1949354290',
    Resources: baseUrl + '&gid=980384336',
    Logos: baseUrl + '&gid=1172783543',
    Categories: baseUrl + '&gid=1634896233',
    Overlays: baseUrl + '&gid=855555965'
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
const handleOverlays = (overlays, data) => {
    return overlays.map((overlay, idx) => {
        switch(overlay.dataType) {
            case 'geojson': {
                // GeoJSON can use URL, not need to download the data - include this URL in the value written to overlay.json
                return { ...overlay, data: overlay.dataSource }
            }
            case 'csv': {
                // Build a GeoJSON from existing CSV data
                if (overlay.geometryType === 'point') {
                    return { ...overlay, data: data[idx].map(f => ({
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [f.longitude, f.latitude]
                            },
                            "properties": f
                        }))}
                } else if (overlay.geometryType === 'polygon') {
                    return { ...overlay, data: {
                            "type": "FeatureCollection",
                            "name": overlay.displayName,
                            "features": data[idx].map(f => ({
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "type": "MultiPolygon",
                                    "coordinates": f
                                }
                            }))
                        }}
                } else {
                    console.log(`WARNING: Overlay ${overlay.displayName} uses an unsupported geometryType: ${overlay.geometryType}. Please set geometryType to a supported value: either "point" or "polygon"`);
                    break;
                }
            }
            default: {
                console.log(`WARNING: Overlay ${overlay.displayName} uses an unsupported dataType: ${overlay.dataType}. Please set dataType to a supported value: either "csv" or "geojson"`);
                break;
            }
        }
    });
};

const zipMarkdownDirectoryToJsonArray = (mdDir, predicate = (jsonObj) => jsonObj) => {
    return fs.readdirSync(mdDir).filter(f => f.endsWith('.md')).map(filename => {
        const mdFilePath = path.join(mdDir, filename);
        const fullContents = fs.readFileSync(mdFilePath, 'utf-8');
        DEBUG && console.log(`Full Contents:`, fullContents);

        // Header should always be empty - warn if it is not
        // TODO: will frontmatter always be present? do we need to handle cases without frontmatter?
        const [ header, frontmatterYaml, contents ] = fullContents.split('---\n');
        header && console.warn(`WARNING - header contained unexpected text: ${header}`);
        // DEBUG && console.log('Initial Post Metadata fetched: ', { header, frontmatterYaml, contents });

        // Return combined frontmatter + markdown content
        // If provided, run predicate on this object
        const finalJson = predicate.call(null, {
            ...yaml.parse(frontmatterYaml),
            contents
        });
        DEBUG && console.log('Post JSON compiled:: ', finalJson);
        return finalJson;
    });
};

const injectTaglineIntoPost = (jsonObj) =>
    injectJsonField(jsonObj, 'tagline', (obj) => {
        DEBUG && console.log('Injecting "tagline" field into post...');
        const tagline = obj.contents.split("\n\n")   // Grab first line of non-header content and use that as a tagline
          .filter((line) => !line.startsWith("#"))   // ignore any header lines
          .find(() => true)                          // return first match
          .split(" ").slice(0, 25).join(" ");        // return first 25 words

        // Make sure it ends with ellipses
        return tagline.endsWith('.') ? `${tagline}..` : `${tagline}...`;
    });

const injectJsonField = (jsonObj, fieldName, getValue) => {
    jsonObj[fieldName] = getValue.call(null, jsonObj);
    return jsonObj;
};

const zipJsonDirectoryToArray = (jsonDir, predicate = (jsonObj) => jsonObj) => {
    return fs.readdirSync(jsonDir).filter(f => f.endsWith('.json')).map(filename => {
        const jsonFilePath = path.join(jsonDir, filename);
        const jsonStr = fs.readFileSync(jsonFilePath, 'utf-8');
        const jsonObj = JSON.parse(jsonStr);

        // If provided, run predicate on this object
        return predicate.call(null, jsonObj);
    })
};

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
        categories,
        overlays
    ] = await Promise.all([
        fetchAndParse(baseSheets.Columns),
        fetchAndParse(baseSheets.Variables),
        fetchAndParse(baseSheets.BaseLayers),
        fetchAndParse(baseSheets.Sheets),
        fetchAndParse(baseSheets.Resources),
        fetchAndParse(baseSheets.Logos),
        fetchAndParse(baseSheets.Categories),
        fetchAndParse(baseSheets.Overlays),
    ])
    const dataSheets = await Promise.all(sheetsToFetch.map(sheet => fetchAndParse(sheet['Data Sheet Link'])));
    mergeData(baseData, dataSheets);
    const overlayData = await Promise.all(overlays.map(o => o.dataType === 'csv' && fetchAndParse(o.dataSource)));
    const parsedOverlays = await handleOverlays(overlays, overlayData);
    const cleanedVariables = handleVariables(variables, categories);
    const cmsPostsDir = path.join(__dirname, '..', 'public', 'content', 'posts');
    const cmsStickersDir = path.join(__dirname, '..', 'public', 'content', 'stickers');
    const cmsPosts = zipMarkdownDirectoryToJsonArray(cmsPostsDir, (post) => injectTaglineIntoPost(post));
    const cmsStickers = zipJsonDirectoryToArray(cmsStickersDir);
    const buffer = geobuf.encode(baseData, new Pbf());
    await writeShp(baseData, path.join(__dirname, '..', 'public', 'shp', 'chives-data.zip'));
    const csvString = papa.unparse(baseData.features.map(f => f.properties));

    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'variables.json'), JSON.stringify(cleanedVariables));
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'columns.json'), JSON.stringify(columnInfo));
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'resources.json'), JSON.stringify(resources));
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'logos.json'), JSON.stringify(logos));
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'categories.json'), JSON.stringify(categories));
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'baseLayers.json'), JSON.stringify(baseLayers));
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'overlays.json'), JSON.stringify(parsedOverlays));
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'content', 'stickers.json'), JSON.stringify(cmsStickers, null, 4));
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'content', 'posts.json'), JSON.stringify(cmsPosts, null, 4));
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
