import { useMemo } from "react";

const processData = (data, columnsToParse, prefix) => {
  let processedData = {};

  for (let j = 0; j < columnsToParse.length; j++) {
    const {
      accessor,
      accumulator,
      reducer,
      name,
      defaultAccumulated = 0,
    } = columnsToParse[j];
    const prefixedName = prefix + name;

    processedData[prefixedName] = {
      values: [],
      accumulated: defaultAccumulated,
      reduced: 0,
    };
    for (let i = 0; i < data.length; i++) {
      const entry = accessor(data[i]);
      if (!!entry) {
        processedData[prefixedName].values.push(entry);
        processedData[prefixedName].accumulated = accumulator(
          processedData[prefixedName].accumulated,
          entry
        );
      }
    }
    const reduced = reducer(processedData[prefixedName]);
    processedData[prefixedName].reduced = isNaN(reduced) ? undefined : reduced;
    processedData[prefixedName].values = processedData[
      prefixedName
    ].values.sort((a, b) => a - b);
  }

  return [processedData, new Date()];
};

export default function useProcessData({
  data = [],
  metrics = [],
  updateTrigger = null,
  prefix = "",
}) {
  //eslint-disable-next-line
  return useMemo(
    () => processData(data, metrics, prefix),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ updateTrigger ? updateTrigger : JSON.stringify({ data, metrics, updateTrigger }) ]
  );
}
