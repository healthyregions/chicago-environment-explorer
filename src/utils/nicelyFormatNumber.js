
export function nicelyFormatNumber(x){
    const val = +x;
    if (!x || isNaN(val)) return x;
    if (val < 0.0001) return val.toExponential();
    if (val < 0.01) return val.toFixed(4);
    if (val < 1) return val.toFixed(3);
    if (val < 1_000) return val.toFixed(2);
    // if (val < 10_000) return `${(val/1_000).toFixed(1)}K`;
    // if (val < 1_000_000) return `${(val/1_000).toFixed(0)}K`;
    // if (val < 1_000_000_000) return `${(val/1_000_000).toFixed(1)}M`;
    // if (val < 1_000_000_000_000) return `${(val/1_000_000).toFixed(1)}B`;
    return val.toLocaleString();
}