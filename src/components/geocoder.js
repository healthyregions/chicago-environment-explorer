// general imports, state
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import throttle from 'lodash/throttle';
import styled from 'styled-components';
import { colors } from '../config';

const Container = styled.div`
    flex:auto;
    width:100%;
    .MuiFormControl-root {
        margin:0;
        /* border-bottom:2px solid ${colors.chicagoDarkBlue}; */
        background: rgba( 255, 255, 255, 0.85 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.85 );
        backdrop-filter: blur( 20px );
        -webkit-backdrop-filter: blur( 20px );
        box-shadow: 2px 0px 5px ${colors.gray}44;  
        border:1px solid ${colors.green};
    }
    .MuiAutocomplete-inputRoot {
        background:white;
        height:${({height}) => height||36}px;
        border-radius:0px;
        padding:0;
    }
    .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-child {
        padding:0;
        color:${colors.black};
    }
    .MuiInput-underline:hover:not(.Mui-disabled):before {
        /* border-bottom:2px solid ${colors.chicagoBlue}; */
    }
    .MuiInput-underline:after {
        /* border-bottom:2px solid ${colors.chicagoBlue}; */

    }
    .MuiFormControl-root .MuiInputBase-adornedEnd:before {
        display: block;
        content: ' ';
        background-image: url("${process.env.PUBLIC_URL}/assets/img/search.svg");
        background-size: 20px 20px;
        height: 20px;
        width: 20px;
        transform:translate(8px, -9px);
        border-bottom:none !important;
    }

`

// const StyledOption = styled.span`
//     height: 2em;
//     span {
//         padding-left:1em;
//         display:block;
//         font-size:12px;
//         &:first-child {
//             font-size:16px;
//             font-weight:bold;
//         }

//     }
// `

const Geocoder = ({
    onChange,
    placeholder,
    style,
    height,
    API_KEY
}) => {

    const [searchState, setSearchState] = useState({
        results: [],
        value: '',
    })

    const loadResults = (results) => {
        setSearchState(prev => ({
            ...prev,
            results
        }))
    }

    const clearInput = () => {
        setSearchState({
            results: [],
            value: '',
        })
    }
    
    const buildAddress = (text) => `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${API_KEY}&country=US&autocomplete=true&types=region%2Cdistrict%2Cpostcode%2Clocality%2Cplace%2Caddress&bbox=-88.28487843194713%2C41.54199009379835%2C-87.52216519803295%2C42.16483530634653`

    const getMapboxResults = async (text, callback) => fetch(buildAddress(text)).then(r => r.json()).then(r => callback(r.features))

    const queryMapbox = React.useMemo(
        () =>
          throttle((text, callback) => {
                getMapboxResults(text, callback)
          }, 200),
          // eslint-disable-next-line
        [],
      );
      
    //   
    const handleSearch = async (e) => {
        if (e.target.value.length > 3) {
            queryMapbox(e.target.value, (r) => loadResults(r))
        }
    }

    // const formatPlaceContext = (contextArray) => {
    //     let returnString = ``
    //     if (contextArray && contextArray.length){
    //         for (let i=0; i<contextArray.length; i++) {
    //             if (
    //                 contextArray[i].id.includes('region')
    //                 ||
    //                 contextArray[i].id.includes('country')
    //                 ||
    //                 contextArray[i].id.includes('place')
    //                 ||
    //                 contextArray[i].id.includes('neighborhood')
    //             ) {
    //                 returnString += `${contextArray[i].text}, `
    //             }
    //         }
    //     }
    //     return returnString.slice(0,-2)
    // }

    return (
        <Container {...{height}}>
            <Autocomplete
                id="geocoder search"
                freeSolo
                disableClearable
                filterOptions={(x) => x}
                autoComplete
                clearOnEscape
                inputValue={searchState.value}
                options={searchState.results}
                getOptionLabel={option => option.place_name}
                onChange={(source, selectedOption) => {
                    clearInput();
                    onChange(selectedOption);
                }}
                // renderOption={(option, idx) => <React.Fragment>
                //     <StyledOption id={idx}>
                //         <span>{!!option.key && option.key.split(',')[0]}</span>
                //         <span>{!!option.key && option.key.split(',').slice(1,).join(', ')}</span>
                //     </StyledOption>
                // </React.Fragment>
                // }
                renderInput={(params) => (
                    <TextField
                    {...params}
                    margin="normal"
                    placeholder={placeholder}
                    InputProps={{ ...params.InputProps, type: 'search' }}
                    onChange={(e) => {               
                        setSearchState(prev => ({
                            ...prev,
                            value: e.target.value,
                        }));
                        handleSearch(e)}
                    }
                    />
                )}
                style={style}
            />
        </Container>
    )
}

export default Geocoder