import React from 'react';

// This component handles and formats the map tooltip info regarding Cooling Centers.
// The props passed to this component should contain an object of the hovered object (from deck, info.object by default)
const MapCoolingCenterTooltipContent = ({content, overlay}) => {
    const {
        site_name,
        site_type,
        address,
        city,
        state,
        zip,
        phone,
        hours_of_operation
    } = content;

    const interpolatePopupTemplate = (content, overlay, template) => {
        let result = template;
        template.match(/({[a-zA-Z_-]*})/g).forEach(match => {
            const keyName = match.replace('{', '').replace('}', '');
            result = result.replace(match, content[keyName]);
        });

        console.log('Result:', result);
        return result;
    };

    /** Takes a variable name (e.g. site_name) and turns it into a human-readable label (eg. Site Name) */
    const humanReadableName = (keyName) => {
        // Replace special chars with spaces
        const phrase = keyName.replace(/_/g, ' ').replace(/-/g, ' ')

        // Capitalize each word in the phrase, then return
        return phrase.split(' ').map(term =>
            term[0].toUpperCase() + term.substring(1)
        ).join(' ');
    };

    return (
        <>
            <h2>{interpolatePopupTemplate(content, overlay, overlay.popupTitle)}</h2>
            {content && <div style={{overflowY:'scroll', height:'150px'}}><span><table>
                <tbody>
                    {JSON.parse(overlay?.popupContent)?.map(keyName => <>
                        {content[keyName] && <tr key={'popup-content-' + keyName}><td>{humanReadableName(keyName)}</td><td>{content[keyName]?.toLocaleString('en')}</td></tr>}
                    </>)}
                </tbody>
            </table>

            </span></div>}
        </>
    )
}

export default MapCoolingCenterTooltipContent;
