import {expose} from 'comlink'

class Utilities {
    within(point, bounds){ return point[0] > bounds[0] && point[0] < bounds[2] && point[1] < bounds[1] && point[1] > bounds[3]}
    mean(array, accessor) {
        let sum = 0;
        for (let i=0; i<array.length; i++) sum += accessor(array[i])
        return sum / array.length
    }
    kernelDensityEstimator(kernel, X) {
        return (V) => {
            return X.map((x) => [x, this.mean(V, (v) => kernel(x - v))])
        };
    }
    kernelEpanechnikov(k) {
        return function (v) {
            return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        };
    }
}

class QueryFeatureRunner {
    constructor() {
        this.utilities = new Utilities();
        this.geojsonData = null;
        this.centroids = null;
    }
    generateFilteredData(params) {
        // Instead of destructuring for older ES support 
        const {
            storedGeojson,
            centroids,
            extent,
            columns,
            ranges,
            filters
        } = params;

        if (!this.geojsonData) this.geojsonData = storedGeojson;
        if (!this.centroids) this.centroids = centroids;
        const dataIsCached = this.geojsonData && this.centroids;
        
        // declare return arrays and object
        // return array will hold the list of objects with data information
        // data columns have the names of the data from geojson
        // maximums contains the scale
        let histCounts = {};
        let rawVals = {};
        let densities = {};
        let sums = {};
        let totalPop = 0;
        let totalTrees = 0;
        let totalTreesArea = 0;
        let heatIsland = 0;
        let treeCoverage = 0;
        let communityCounts = {};
        let count = 0;
        
        for (let n = 0; n < columns.length; n++) {
            sums[columns[n]] = 0
            histCounts[columns[n]] = []
            rawVals[columns[n]] = []
            for (let x = 0; x < 9; x++) {
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
    
        let filterPresent = false;
        if (Object.keys(filters).length) filterPresent = true;
    
        for (let i = 0; i < this.geojsonData.features.length; i++) {
            if (this.utilities.within(this.centroids[i].feature.geometry.coordinates, extent)) {
    
                if (communityCounts[this.geojsonData.features[i].properties.community] === undefined) {
                    communityCounts[this.geojsonData.features[i].properties.community] = 1
                } else {
                    communityCounts[this.geojsonData.features[i].properties.community] += 1
                }
    
                let filterPass = true;
    
                if (filterPresent) {
                    let filterList = Object.keys(filters);
                    let filterValues = Object.values(filters);
    
                    for (let n = 0; n < filterList.length; n++) {
                        if (typeof filterValues[n][0] === 'string') {
                            if (!filterValues[n][0].includes(this.geojsonData.features[i].properties[filterList[n]])) {
                                filterPass = false;
                                break;
                            }
                        } else {
                            if (this.geojsonData.features[i].properties[filterList[n]] < filterValues[n][0]
                                ||
                                this.geojsonData.features[i].properties[filterList[n]] > filterValues[n][1]) {
                                filterPass = false;
                                break;
                            }
                        }
                    }
                }
    
                if (filterPass) {
                    totalPop += this.geojsonData.features[i].properties.acs_population
                    totalTrees += this.geojsonData.features[i].properties.trees_n
                    totalTreesArea += this.geojsonData.features[i].properties.trees_area
                    heatIsland += this.geojsonData.features[i].properties.heatisl
                    treeCoverage += this.geojsonData.features[i].properties.trees_crown_den
                    count += 1;
                }
    
    
                for (let n = 0; n < columns.length; n++) {
                    if (!this.geojsonData.features[i].properties[columns[n]]) continue
                    sums[columns[n]] += this.geojsonData.features[i].properties[columns[n]]
                    rawVals[columns[n]].push(this.geojsonData.features[i].properties[columns[n]])
                    for (let x = 0; x < 9; x++) {
                        if (this.geojsonData.features[i].properties[columns[n]] <= ranges[columns[n]].histogramBins[x]) {
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
            let k = (ranges[columns[n]].max - ranges[columns[n]].min)/10
            let kde = this.utilities.kernelDensityEstimator(this.utilities.kernelEpanechnikov(k), ranges[columns[n]].histogramBins)
            let estimate =  kde(rawVals[columns[n]])
            densities[columns[n]] = estimate.map(([value, density]) => ({
                value,
                density 
            }))
        }
        
        heatIsland /= count
        treeCoverage /= count
        sums['count'] = count
    
        return { success: true, dataIsCached, communityCounts, ranges, histCounts, densities, sums, totalPop, totalTrees, totalTreesArea, treeCoverage, heatIsland };
    }
    
}

const queryFeatureRunner = new QueryFeatureRunner();
// Expose it to Comlink
expose(queryFeatureRunner);