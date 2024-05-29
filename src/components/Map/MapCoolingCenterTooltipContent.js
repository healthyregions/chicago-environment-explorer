import React from 'react';

// This component handles and formats the map tooltip info regarding Cooling Centers.
// The props passed to this component should contain an object of the hovered object (from deck, info.object by default)
const MapCoolingCenterTooltipContent = ({content}) => {
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
    
    return (
        <>
            <h2>{site_type}: {site_name}</h2>
            {content && <div style={{overflowY:'scroll', height:'150px'}}><span><table>
                <tbody>
                    {site_type && <tr><td>Site Type</td><td>{site_type?.toLocaleString('en')}</td></tr>}
                    {site_name && <tr><td>Site Name</td><td>{site_name?.toLocaleString('en')}</td></tr>}
                    {address && <tr><td>Address</td><td>{address?.toLocaleString('en')}</td></tr>}
                    {city && <tr><td>City</td><td>{city?.toLocaleString('en')}</td></tr>}
                    {state && <tr><td>State</td><td>{state?.toLocaleString('en')}</td></tr>}
                    {zip && <tr><td>ZIP Code</td><td>{zip?.toLocaleString('en')}</td></tr>}
                    {hours_of_operation && <tr><td>Hours of Operation</td><td>{hours_of_operation?.toLocaleString('en')}</td></tr>}
                    {phone && <tr><td>Phone</td><td>{phone?.toLocaleString('en')}</td></tr>}
                </tbody>
            </table>

            </span></div>}
        </>
    )
}

export default MapCoolingCenterTooltipContent;
