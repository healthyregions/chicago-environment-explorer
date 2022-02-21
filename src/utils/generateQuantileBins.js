const filterMissing = (x) => ![null, undefined].includes(x) && !isNaN(x);

export const generateQuantileBins = (data, nBins, accessor) => {
    const columnData = data.features.map(accessor).filter(filterMissing).sort((a,b) => a - b)
    const bins = Array(nBins).fill(0).map((_, i) => columnData[Math.round((data.features.length/nBins)*i)]).slice(1,)
    return bins;
}