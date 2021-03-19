// webworker.js

function within(point, bounds){
    if (point[0] > bounds[0] && 
        point[0] < bounds[2] && 
        point[1] < bounds[1] && 
        point[1] > bounds[3]
    ) {
        return true
    } else {
        return false
    }
};

function generateFilteredData(params){
    // Instead of destructuring for older ES support    
    var geojsonData = params.storedGeojson;
    var centroids = params.centroids;
    var extent = params.extent;
    var columns = params.columnNames;
    var ranges = params.ranges
    // declare return arrays and object
    // return array will hold the list of objects with data information
    // data columns have the names of the data from geojson
    // maximums contains the scale
    var histCounts = {};
    var sums = {};
    var totalPop = 0;
    var totalTrees = 0;
    var totalTreesArea = 0;
    var count = 0;
    
    for (var n=0; n<columns.length;n++){
        sums[columns[n]] = 0       
        histCounts[columns[n]] = []
        for (var x=0; x<10; x++){
            histCounts[columns[n]].push({binNumber:x, count:0, min: ranges[columns[n]].histogramBins[n-1]||ranges[columns[n]].min, max:ranges[columns[n]].histogramBins[n]})
        }          
    };
    
    for (var i=0; i<geojsonData.features.length;i++){
        if (within(centroids[i].feature.geometry.coordinates, extent)) {
            totalPop += geojsonData.features[i].properties.acs_population
            totalTrees += geojsonData.features[i].properties.trees_n
            totalTreesArea += geojsonData.features[i].properties.trees_area
            count += 1;

            for (var n=0; n<columns.length;n++){
                if (!geojsonData.features[i].properties[columns[n]]) continue
                sums[columns[n]] += geojsonData.features[i].properties[columns[n]]

                for (var x=0; x<10; x++){
                    if (geojsonData.features[i].properties[columns[n]] < ranges[columns[n]].histogramBins[x]) {
                        histCounts[columns[n]][x].count += 1
                        break
                    }                    
                }
            }
        } else {
            continue
        }
    }

    sums['count'] = count

    return {success: true, histCounts, sums, totalPop, totalTrees, totalTreesArea};
}


onmessage = function(e) {
    var workerResult = generateFilteredData(e.data);
    postMessage(workerResult);
}