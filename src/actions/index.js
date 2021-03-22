// These actions are part of the verbose boilerplate of redux
// As part of the Flux architecture, these connect the dispatch from a component to the reducers

export const loadDataAndBins = ( geojsonData, bins ) => {
    return {
        type: 'DATA_LOAD',
        payload: {
            geojsonData,
            bins
        }
    }
}


// sets the variables parameters (index and range, numerator, denominator, etc.)
export const changeVariable = ( params ) => {
    return {
        type: 'CHANGE_VARIABLE',
        payload: {
            params
        }
    }
}

// sets the map parameters (color mode, viz type, etc.)
export const setMapParams = ( params ) => {
    return {
        type: 'SET_MAP_PARAMS',
        payload: {
            params
        }
    }
}

// loads in chart data from current data
export const setSelectionData = ( data ) => {
    return {
        type: 'SET_SELECTION_DATA',
        payload: {
            data
        }
    }
}

// sets the anchor element for the inforational tooltip
export const setAnchorEl = ( anchorEl ) => {
    return {
        type: 'SET_ANCHOR_EL',
        payload: {
            anchorEl
        }
    }
}

// sets the left, right, and dock panel states
export const setPanelState = ( params ) => {
    return {
        type: 'SET_PANELS',
        payload: {
            params
        }
    }
}

export const setMapLoaded = ( loaded ) => {
    return {
        type: 'SET_MAP_LOADED',
        payload: {
            loaded
        }
    }
}

export const setNotification = ( info ) => {
    return {
        type: 'SET_NOTIFICATION',
        payload: {
            info
        }
    }
}

export const setUrlParams = ( urlParams, presets ) => {
    return {
        type: 'SET_URL_PARAMS',
        payload: {
            urlParams,
            presets
        }
    }
}

export const openContextMenu = ( params ) => {
    return {
        type: 'OPEN_CONTEXT_MENU',
        payload: {
            params
        }
    }
}

export const applyFilterValues = ( name, range ) => {
    return {
        type: 'APPLY_FILTER_VALUES',
        payload: {
            name,
            range
        }
    }
}

export const removeFilterValues = ( name ) => {
    return {
        type: 'REMOVE_FILTER_VALUES',
        payload: {
            name
        }
    }
}

export const removeFilterEntry = ( name, value ) => {
    return {
        type: 'REMOVE_FILTER_ENTRY',
        payload: {
            name, 
            value
        }
    }
}

