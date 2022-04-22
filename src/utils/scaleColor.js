export const scaleColor = (val, bins, colors) => {
    for (let i=0; i<bins.length;i++){
        if (val <= bins[i]) return colors[i]
    }
    return colors[colors.length-1]
}