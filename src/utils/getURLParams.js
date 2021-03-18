const getURLParams = (params) => {
    const { mapParams, coords, currentData, lastDateIndex } = params;

    let mapCoords = `?lat=${Math.round(coords.latitude*1000)/1000}&lon=${Math.round(coords.longitude*1000)/1000}&z=${Math.round(coords.zoom*10)/10}`;
    let source = `&src=${currentData.split('.geojson')[0]}`
    let variable = mapParams.variableName !== 'Confirmed Count per 100K Population' ? `&var=${mapParams.variableName.replace(/ /g,"_")}` : ''
    let method = mapParams.mapType !== 'natural_breaks' ? `&mthd=${mapParams.mapType}` : '';
    let prop = mapParams.nProperty !== null ? `&propCol=${mapParams.nProperty}` : '';
    let bin = mapParams.binMode !== '' ? '&dbin=True' : ''        
    let date = lastDateIndex !== null && mapParams.nIndex !== lastDateIndex.slice(-1,)[0] ? `&date=${mapParams.nIndex}` : '';
    let dateRange = mapParams.nRange !== 7 && mapParams.nType === 'time-series' ? `&range=${mapParams.nRange}` : ''
    let overlay = mapParams.overlay ? `&ovr=${mapParams.overlay}` : '';
    let resource = mapParams.resource ? `&res=${mapParams.resource}` : '';
    let mapType = mapParams.vizType === "cartogram" ? `&viz=cartogram` : mapParams.vizType === '3D' ? '&viz=3D' : '';
  
    return `${mapCoords}${source}${variable}${method}${prop}${bin}${date}${dateRange}${overlay}${resource}${mapType}&v=2`
}

export default getURLParams;