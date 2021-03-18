const getVarId = (currentData, mapParams) => {
    return `${currentData}-${mapParams.numerator}-${mapParams.nIndex}-${mapParams.nRange}-${mapParams.denominator}-${mapParams.dProperty}-${mapParams.dIndex}-${mapParams.dRange}-${mapParams.scale}`
}

export default getVarId;