import React from 'react';

// This component handles and formats the map tooltip info regarding the clicked Overlay point.
// The props passed to this component should contain an object of the hovered object (from deck, info.object by default),
// as well as a reference to the overlay that was clicked
const MapOverlayTooltipContent = ({content, overlay}) => {
  const interpolatePopupTitle = (content, overlay) => {
    let result = overlay?.popupTitle;
    overlay?.popupTitle.match(/({[a-zA-Z_-]*})/g).forEach(match => {
      const keyName = match.replace('{', '').replace('}', '');
      result = result.replace(match, content[keyName]);
    });

    return result;
  };

  const popupFields = JSON.parse(overlay?.popupContent);
  const printContents = (popupFields, content) => {
    return (
      <>
        {typeof content === 'boolean' && <>{printContents(popupFields, content ? 'Yes' : 'No')}</>}
        {typeof content === 'string' && <tr key={'popup-content-' + popupFields}><td>{popupFields}</td><td>{content}</td></tr>}
        {typeof content === 'object' && content.sort && printContents(popupFields, content.join(' & '))}
        {typeof content === 'object' && !content.sort && Object.keys(popupFields)?.map((keyName) =>
          printContents(popupFields[keyName], content[keyName])
        )}
      </>
    )
  };

  return (
    <>
      <h2>{interpolatePopupTitle(content, overlay)}</h2>
      {content && <div style={{overflowY:'scroll', height:'150px'}}><span><table>
                <tbody>
                    {printContents(popupFields, content)}
                </tbody>
            </table>

            </span></div>}
    </>
  )
}

export default MapOverlayTooltipContent;
