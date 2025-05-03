import * as React from 'react';


function MapMarkerPin({size = 30, sticker}) {
  const pinStyle = {
    cursor: 'pointer',
    stroke: 'none',
    width: size + 'px',
    height: size + 'px',
    borderRadius: size + 'px',
    backgroundColor: 'white',
    border: 'solid darkgrey 1px',
  };

  return (
    <img width={size} height={size} style={pinStyle} src={sticker?.logo} alt={sticker?.title} />
  );
}

export default React.memo(MapMarkerPin);
