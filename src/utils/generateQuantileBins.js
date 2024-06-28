const filterMissing = (x) => ![null, undefined].includes(x) && !isNaN(x);

export const generateQuantileBins = (data, colorScale, accessor, mapParams) => {
    if (mapParams.Bins) return mapParams.Bins;
    const nBins = colorScale?.length || 6;
    //console.log('generating bins: ' + nBins);
    const columnData = data.features.map(accessor).filter(filterMissing).sort((a,b) => a - b)
    const bins = Array(nBins).fill(0).map((_, i) => columnData[Math.round((data.features.length/nBins)*i)]).slice(1,)
    return bins;
}
