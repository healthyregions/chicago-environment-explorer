import {Legend, MapSection} from "../index";
import {defaultBounds} from "../Pages/Map";
import Typography from "@mui/material/Typography";
import {WeightsPieChart} from "./Weights";
import Grid from "@mui/material/Grid";
import {FaCaretDown} from "@react-icons/all-files/fa/FaCaretDown";
import {colors, variablePresets} from "../../config";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, {useRef} from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import {createFileName, useScreenshot} from "use-react-screenshot";
import {max, mean, min, quantile, quantileRank, sampleStandardDeviation, sum, zScore} from "simple-statistics";
import {useDispatch, useSelector} from "react-redux";
import {changeVariable, setPanelState} from "../../actions";
import {useChivesData} from "../../hooks/useChivesData";
import {useHistory} from "react-router-dom";


export const FloatingPanel = styled.h1`
  font-weight: normal;
  position: fixed;
  margin: 0;
  padding: 0;
  z-index: 1;
  width: 375px;
  border: 1px solid ${colors.green};
  background-color: ${colors.white};
  box-shadow: rgba(43, 43, 43, 0.267) 3px 0px 5px;;
  min-width: 200px;
`;

const BoldedPinkText = styled.strong`
  color: ${colors.pink};
`;
const LinkButton = styled(Button)`
  color: ${colors.forest};
`;
const PrimaryButton = styled(Button)`
  background-color: ${props => `rgba(61, 96, 23, ${props.canNext ? 100 : 30})`};
  color: ${colors.white};
  &:active {
    background-color: ${props => `rgba(61, 96, 23, ${props.canNext ? 100 : 30})`};
  }
  &:hover {
    background-color: ${props => `rgba(61, 96, 23, ${props.canNext ? 100 : 30})`};
  }
`;

// TODO: source these icons from @react-icons/all-files
const FaCsvIcon = () =>
    <svg style={{ width: '1rem', marginRight: '1rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        { /* !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
        <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V304H176c-35.3 0-64 28.7-64 64V512H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM200 352h16c22.1 0 40 17.9 40 40v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-8c0-8.8 7.2-16 16-16s16 7.2 16 16v8c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V392c0-22.1 17.9-40 40-40zm133.1 0H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H333.1c-7.2 0-13.1 5.9-13.1 13.1c0 5.2 3 9.9 7.8 12l37.4 16.6c16.3 7.2 26.8 23.4 26.8 41.2c0 24.9-20.2 45.1-45.1 45.1H304c-8.8 0-16-7.2-16-16s7.2-16 16-16h42.9c7.2 0 13.1-5.9 13.1-13.1c0-5.2-3-9.9-7.8-12l-37.4-16.6c-16.3-7.2-26.8-23.4-26.8-41.2c0-24.9 20.2-45.1 45.1-45.1zm98.9 0c8.8 0 16 7.2 16 16v31.6c0 23 5.5 45.6 16 66c10.5-20.3 16-42.9 16-66V368c0-8.8 7.2-16 16-16s16 7.2 16 16v31.6c0 34.7-10.3 68.7-29.6 97.6l-5.1 7.7c-3 4.5-8 7.1-13.3 7.1s-10.3-2.7-13.3-7.1l-5.1-7.7c-19.3-28.9-29.6-62.9-29.6-97.6V368c0-8.8 7.2-16 16-16z"/>
    </svg>

const FaPngIcon = () =>
    <svg style={{ width: '1rem', marginRight: '1rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        { /* !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
        <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm152 32c5.3 0 10.2 2.6 13.2 6.9l88 128c3.4 4.9 3.7 11.3 1 16.5s-8.2 8.6-14.2 8.6H216 176 128 80c-5.8 0-11.1-3.1-13.9-8.1s-2.8-11.2 .2-16.1l48-80c2.9-4.8 8.1-7.8 13.7-7.8s10.8 2.9 13.7 7.8l12.8 21.4 48.3-70.2c3-4.3 7.9-6.9 13.2-6.9z"/>
    </svg>

const SummaryMapPage = ({ selections }) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { storedGeojson } = useChivesData();

    const mapParams = useSelector((state) => state.mapParams);
    const colorScale = [[237, 248, 251], [158, 188, 218], [140, 150, 198], [129, 15, 124]];

    const [image, takeScreenshot] = useScreenshot({
        type: "image/png",
        quality: 1.0
    });

    const normalized = {...storedGeojson};
    const mapRef = useRef(null);

    // Hide margin from DataPanel (hidden)
    dispatch(setPanelState({info: false}));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const download = (dataURL, { name = "chives-custom-index", extension = "png" } = {}) => {
        const a = document.createElement("a");
        a.href = dataURL;
        a.download = createFileName(extension, name);
        a.click();
    };
    const downloadCsv = (event) => {
        // Determine keys
        // Always include geoid column, include columns selected by the user
        const keys = ['geoid', 'CUSTOM_INDEX', 'CUSTOM_INDEX_scaled'];
        const weightMax = sum(selections.map(s => s.value));
        selections.map(sel => {
            const columnName = variablePresets[sel.name].Column;
            keys.push(columnName);
            keys.push(`${columnName}_zscore`);

            const weightPct = Math.round(100 * (sel.value / weightMax));
            keys.push(`${columnName}_weight${weightPct}pct`);
            return weightPct;
        });

        // Parse to collect all user-selected variable values
        const rows = [keys];
        normalized.features.forEach((feature) => {
            // Add row value data for each selected indicator
            rows.push(keys.map(key => feature.properties[key]));
        });

        // Convert collected data to CSV
        const csvContent = "data:text/csv;charset=utf-8,"
            + rows.map(r =>
                // Use empty string for null/undefined
                // Surround valid values with double-quote (e.g. "Vulnerable, Prices Rising")
                r.map(r => (r === null || r === undefined) ? "" : `"${r}"`
                ).join(",")).join("\r\n");

        // Download as a CSV file - open in Excel for viewing
        download(encodeURI(csvContent),{ extension: "csv" });

        handleClose();
    };

    const downloadPng = (event) => {
        // Call the takeScreenshot function to capture the map
        // This should include the loaded map data / viewport + Legend + description panel
        takeScreenshot(mapRef.current).then(download);

        handleClose();
    };

    // Compute weight maximums
    const weightMax = sum(selections.map(s => s.value));

    storedGeojson?.features?.forEach((feature, index) => {
        // Initialize / reset a new accumulator for this feature/index
        normalized.features[index].properties["CUSTOM_INDEX"] = 0;

        selections.forEach(sel => {
            // Determine column name and value
            const variable = variablePresets[sel.name];
            const columnName = variable.Column;
            const scaling = variable.scaling || 1;

            // Get all values, use them to determine mean and standard deviation
            const values = storedGeojson.features.map(f => f.properties[columnName]).filter(f => f || (!variable['ignore_0'] && f === 0));
            if (index === 0 && values.length !== storedGeojson.features.length) {
                console.warn(`Warning: length mismatch with ${columnName}`);
            }

            const m = mean(values);
            const sd = sampleStandardDeviation(values);

            // TODO: how to handle non-numeric variables? exclude them?
            const value = feature.properties[columnName];
            if (variable['ignore_0'] && value === 0) {
                // If this value is zero and we should ignore zero for this variable, then ignore it
                return;
            }

            // Compute zScore using value, mean, and standard deviation
            // Use scaling to determine whether +/- needs to be inverted
            const zScoreValue = zScore(value, m, sd);
            feature.properties['geoid'] === '17031030104' && console.log(`Computing zScore value: (${value} - ${m}) / ${sd} = ${value} -> ${zScoreValue}`);

            // Apply weights and accumulate total
            const weighted = scaling * ((sel.value / weightMax) * zScoreValue);
            feature.properties['geoid'] === '17031030104' && console.log(`Applying weight to ${sel.name}: ${scaling} * (${sel.value} / ${weightMax}) * ${zScoreValue} = ${zScoreValue} -> ${weighted}`);
            normalized.features[index].properties["CUSTOM_INDEX"] += weighted;

            // Store these for later CSV download
            const weightPct = Math.round(100 * (sel.value / weightMax));
            normalized.features[index].properties[`${columnName}_weight${weightPct}pct`] = weighted;
            normalized.features[index].properties[`${columnName}_zscore`] = zScoreValue;
        });
    });

    // Finally, scale Custom Index values from 0 to 1
    const values = normalized?.features?.map(f => f.properties[`CUSTOM_INDEX`]).filter(f => f || f === 0);
    if (!values?.length) {
        // Short-circuit
        return (<></>);
    }

    const [min_val, max_val] = [min(values), max(values)];
    const scaledValues = normalized.features.map((f, index) => {
        const value = f.properties[`CUSTOM_INDEX`];
        const scaledValue = (value - min_val) / (max_val - min_val);
        normalized.features[index].properties[`CUSTOM_INDEX_scaled`] = scaledValue;

        return scaledValue;
    });

    // Classify into quantile bins
    const bins = quantile(scaledValues, [0.25, 0.5, 0.75]).map(v => v.toFixed(2));
    console.log(`quantile=${bins}`);

    // Sanity check
    console.log(`Scaled Values: `, scaledValues.sort((v1, v2) => v1 > v2 ? 1 : (v1 < v2 ? -1 : 0)));
    const [min_scaled_val, max_scaled_val] = [min(scaledValues), max(scaledValues)];
    console.log(`${min_scaled_val} < x < ${max_scaled_val}`);

    // Determine rank of each value and include that for CSV download
    normalized.features.map((f, index) => {
        const scaledValue = f.properties['CUSTOM_INDEX_scaled'];
        const rank = quantileRank(scaledValues, scaledValue);
        index < 10 && console.log('Rank: ', rank);
        f.properties['CUSTOM_INDEX_rank'] = rank;
        return rank;
    });

    // Insert a new pseudo-variable for our Custom Index
    variablePresets['HEADER::Custom'] = {};
    variablePresets['Custom Index'] = {
        'Added By': 'You',
        Bins: bins,
        Column: 'CUSTOM_INDEX_scaled',
        'Data Source': 'You',
        'Data Year': null,
        Description: `Custom index with ${selections.length} variables`,
        'Metadata Doc': null,
        'Original Scale': '0 - 1',
        'Variable Name': 'Custom Index',
        accessor: (feature) => feature.properties['CUSTOM_INDEX'],
        scaling: 1,
        bins: bins,
        colorScale: colorScale,
        custom: 1,
        units: '',
        listGroup: 'Custom',
        variableName: 'Custom Index',
        'ignore_0': false
    }

    if (mapParams.variableName !== 'Custom Index') {
        dispatch(changeVariable(variablePresets['Custom Index']));
    }

    const getUniqueGroupNames = () => {
        return selections.map(sel => variablePresets[sel.name].listGroup)
            .filter((value, index, array) => array.indexOf(value) === index);
    }

    const getMaxGroupWeight = () => {
        const groupWeights = [];
        selections.map(sel => ({ name: sel.name, group: variablePresets[sel.name].listGroup, value: sel.value }))
            .forEach(w => {
                const existing = groupWeights.find(g => g.group === variablePresets[w.name].listGroup);
                if (existing) {
                    const index = groupWeights.indexOf(existing);
                    const value = w.value + groupWeights[index].value;
                    groupWeights[index] = { name: w.group, value }
                } else {
                    groupWeights.push({ name: w.group, value: w.value });
                }
            })

        return groupWeights.reduce((prev, curr) => {
                if (!prev || curr.value > prev.value) {
                    return curr;
                }
                return prev;
            }, undefined);
    }

    // TODO: what do we do about ties??
    const renderCustomDescription = () => {
        const maxWeightGroup = getMaxGroupWeight();
        switch(maxWeightGroup.name) {
            case 'Demographic':
                return 'urban development policy makers';
            case 'Air Pollution':
            case 'Ecology & Greenness':
            case 'Environment':
                return 'environmentalists and environmental policy makers';
            case 'Health':
                return 'health management and medical policy makers';
            case 'Social':
                return 'house management and family planning policy makers';
            default:
                return `unknown: ${maxWeightGroup.name}`;
        }
    }

    return (
        <>
            <div id="mainContainer" style={{ position: 'fixed' }} ref={mapRef}>
                <MapSection bounds={defaultBounds} showSearch={false} />
                <Legend
                    variableName={'Custom Index'}
                    colorScale={colorScale}
                    bins={bins}
                />
                <FloatingPanel style={{ top: '75px', left: '20px' }}>
                    <div style={{ padding: '0 2rem', marginTop: '2rem' }}>
                        <Typography variant={'h6'} style={{ marginBottom: '1rem' }}>Custom Index</Typography>
                        <Typography variant={'body2'} style={{ marginBottom: '2rem' }}>
                            <p>The custom index you created has theme{getUniqueGroupNames().length > 1 && <>s</>}:</p>
                            <p>
                                {
                                    getUniqueGroupNames()
                                        .map((group, index, array) => <>
                                        {
                                            index > 0 && array.length > 2 && <>, </>
                                        }
                                        {
                                            index !== 0 && index === (array.length - 1) && <> and </>
                                        }
                                        <BoldedPinkText>{group}</BoldedPinkText>
                                    </>)
                                }.
                                With an additional focus on {getMaxGroupWeight().name} indicators, the custom index
                                will be useful for {renderCustomDescription()}.
                            </p>

                        </Typography>
                    </div>
                    <div style={{ marginBottom:'2rem', padding: '0 2rem 1rem 2rem' }}>
                        <WeightsPieChart selections={selections}
                                         showLegend={false}
                                         cx={150}
                                         width={350}
                                         height={150} />
                    </div>

                    <div style={{ padding: '0.5rem', width: '100%', backgroundColor: 'lightgrey', position: 'absolute', bottom: 0, }}>
                        <Grid container spacing={0}>
                            <Grid item xs>
                                <LinkButton size={'small'} onClick={() => history.goBack()}>Exit</LinkButton>
                            </Grid>
                            <Grid item xs={5}>
                                <PrimaryButton
                                    id="demo-customized-button"
                                    aria-controls={open ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    variant="contained"
                                    disableElevation
                                    onClick={handleClick}
                                    size={'small'}
                                    endIcon={<FaCaretDown style={{ color: colors.green }} />}
                                >
                                    Download
                                </PrimaryButton>
                                <Menu id="demo-customized-menu"
                                      MenuListProps={{
                                          'aria-labelledby': 'demo-customized-button',
                                      }}
                                      anchorEl={anchorEl}
                                      open={open}
                                      onClose={handleClose}>
                                    <MenuItem onClick={() => downloadCsv()} disableRipple>
                                        <FaCsvIcon /> CSV
                                    </MenuItem>
                                    <MenuItem onClick={() => downloadPng()} disableRipple>
                                        <FaPngIcon /> PNG
                                    </MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </div>
                </FloatingPanel>
            </div>
        </>
    );
}

export default SummaryMapPage;
