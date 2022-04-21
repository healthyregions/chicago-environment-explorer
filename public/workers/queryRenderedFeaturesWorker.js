// webworker.js

const within = (point, bounds) => (point[0] > bounds[0] && point[0] < bounds[2] && point[1] < bounds[1] && point[1] > bounds[3])

function generateFilteredData(params) {
    // Instead of destructuring for older ES support    
    var geojsonData = params.storedGeojson;
    var centroids = params.centroids;
    var extent = params.extent;
    var columns = params.columnNames;
    var ranges = params.ranges;
    var filters = params.filterValues;
    // declare return arrays and object
    // return array will hold the list of objects with data information
    // data columns have the names of the data from geojson
    // maximums contains the scale
    var histCounts = {};
    var rawVals = {};
    var densities = {};
    var sums = {};
    var totalPop = 0;
    var totalTrees = 0;
    var totalTreesArea = 0;
    var heatIsland = 0;
    var treeCoverage = 0;
    var communityCounts = {};
    var count = 0;
    
    for (var n = 0; n < columns.length; n++) {
        sums[columns[n]] = 0
        histCounts[columns[n]] = []
        rawVals[columns[n]] = []
        for (var x = 0; x < 9; x++) {
            histCounts[columns[n]].push(
                {
                    binNumber: x,
                    count: 0,
                    min: x === 0 ? ranges[columns[n]].min : ranges[columns[n]].histogramBins[x - 1],
                    max: ranges[columns[n]].histogramBins[x]
                }
            )
        }
    };

    var filterPresent = false;
    if (Object.keys(filters).length) filterPresent = true;

    for (var i = 0; i < geojsonData.features.length; i++) {
        if (within(centroids[i].feature.geometry.coordinates, extent)) {

            if (communityCounts[geojsonData.features[i].properties.community] === undefined) {
                communityCounts[geojsonData.features[i].properties.community] = 1
            } else {
                communityCounts[geojsonData.features[i].properties.community] += 1
            }

            var filterPass = true;

            if (filterPresent) {
                var filterList = Object.keys(filters);
                var filterValues = Object.values(filters);

                for (var n = 0; n < filterList.length; n++) {
                    if (typeof filterValues[n][0] === 'string') {
                        if (!filterValues[n][0].includes(geojsonData.features[i].properties[filterList[n]])) {
                            filterPass = false;
                            break;
                        }
                    } else {
                        if (geojsonData.features[i].properties[filterList[n]] < filterValues[n][0]
                            ||
                            geojsonData.features[i].properties[filterList[n]] > filterValues[n][1]) {
                            filterPass = false;
                            break;
                        }
                    }
                }
            }

            if (filterPass) {
                totalPop += geojsonData.features[i].properties.acs_population
                totalTrees += geojsonData.features[i].properties.trees_n
                totalTreesArea += geojsonData.features[i].properties.trees_area
                heatIsland += geojsonData.features[i].properties.heatisl
                treeCoverage += geojsonData.features[i].properties.trees_crown_den
                count += 1;
            }


            for (var n = 0; n < columns.length; n++) {
                if (!geojsonData.features[i].properties[columns[n]]) continue
                sums[columns[n]] += geojsonData.features[i].properties[columns[n]]
                rawVals[columns[n]].push(geojsonData.features[i].properties[columns[n]])
                for (var x = 0; x < 9; x++) {
                    if (geojsonData.features[i].properties[columns[n]] <= ranges[columns[n]].histogramBins[x]) {
                        histCounts[columns[n]][x].count += 1
                        break
                    }
                }
            }
        } else {
            continue
        }
    }
    for (let n=0; n<columns.length; n++) {
        var k = (ranges[columns[n]].max - ranges[columns[n]].min)/10
        var kde = kernelDensityEstimator(kernelEpanechnikov(k), ranges[columns[n]].histogramBins)
        var estimate =  kde(rawVals[columns[n]])
        densities[columns[n]] = estimate.map(([value, density]) => ({
            value,
            density 
        }))
    }
    
    heatIsland /= count
    treeCoverage /= count
    sums['count'] = count

    return { success: true, communityCounts, ranges, histCounts, densities, sums, totalPop, totalTrees, totalTreesArea, treeCoverage, heatIsland };
}


onmessage = function (e) {
    var workerResult = generateFilteredData(e.data);
    postMessage(workerResult);
}

function mean(array, accessor) {
    let sum = 0;
    for (let i=0; i<array.length; i++) sum += accessor(array[i])
    return sum / array.length
}

function kernelDensityEstimator(kernel, X) {
    return function (V) {
        return X.map((x) => [x, mean(V, (v) => kernel(x - v))])
    };
}

function kernelEpanechnikov(k) {
    return function (v) {
        return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
}