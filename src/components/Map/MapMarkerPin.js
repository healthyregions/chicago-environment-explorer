import * as React from 'react';


function MapMarkerPin({size = 30, imgSrc, imgAlt, clickable = true }) {
  const pinStyle = {
    cursor: clickable ? 'pointer' : 'inherit',
    stroke: 'none',
    //width: size + 'px',
    height: size + 'px',
    //borderRadius: size + 'px',
    //backgroundColor: 'white',
    //border: 'solid darkgrey 1px',
  };

  return (
    <img height={size} style={pinStyle} src={imgSrc} alt={imgAlt} />
  );
}

export default React.memo(MapMarkerPin);
