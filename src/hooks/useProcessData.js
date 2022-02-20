import { useMemo } from 'react';

const processData = (data, columnsToParse, prefix) => {
    let processedData = {}

    for (let j = 0; j < columnsToParse.length; j++) {
        const { accessor,
            accumulator,
            reducer,
            name } = columnsToParse[j];
        const prefixedName = prefix + name

        processedData[prefixedName] = {
            values: [],
            accumulated: 0,
            reduced: 0
        }
        for (let i = 0; i < data.length; i++) {
            const entry = accessor(data[i]);
            if (!!entry) {
                processedData[prefixedName].values.push(entry)
                processedData[prefixedName].accumulated = accumulator(processedData[prefixedName].accumulated, entry)
            }
        }
        processedData[prefixedName].reduced = reducer(processedData[prefixedName])
    }
    
    return [processedData, new Date()]
}

export default function useProcessData({
    data = [],
    metrics = [],
    updateTrigger = null,
    prefix =''
}) {
    return useMemo(() => processData(data, metrics, prefix), [updateTrigger ? updateTrigger : JSON.stringify({ data, metrics, updateTrigger })]);
}