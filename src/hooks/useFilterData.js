import { useMemo } from 'react';

export default function useFilterData({
    data=[],
    filterFunc=()=>true,
    updateTrigger=null
}){
    return useMemo(() => data.filter(filterFunc),[updateTrigger ? updateTrigger : JSON.stringify({data, filterFunc, updateTrigger})]);
}