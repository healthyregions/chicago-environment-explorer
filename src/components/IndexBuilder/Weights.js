import {colors, dataDescriptions} from "../../config";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Stack, TextField} from "@mui/material";
import {pieArcLabelClasses, PieChart} from "@mui/x-charts/PieChart";
import Slider from "@mui/material/Slider";
import React from "react";
import {FaInfoCircle} from "@react-icons/all-files/fa/FaInfoCircle";

/** Minimum/maximum value for sliders */
const SLIDER_MIN = 0;
const SLIDER_MAX = 10;


/** The set of shared color palette to use for Sliders + PieChart slices */
const COLORS = [
    colors.forest,
    colors.green,
    colors.chicagoDarkBlue,
    colors.blue,
    colors.lightblue,
    //colors.purple,
    colors.pink,
    colors.red,
    colors.orange,
    colors.yellow,
    //colors.paleyellow,
];

/** Given a set of selected indicators, allow user to set a weight for each indicator */
export const WeightsSliders = ({ selections, setSelections, setSelectedDetails }) => {

    const updateWeightValues = (event, selection, inputValue) => {
        // Parse text value (fallback to event target if not defined)
        let value = parseInt(inputValue || event.target.value, 10);

        // Min / max boundaries
        if (value > SLIDER_MAX) {
            value = SLIDER_MAX;
        } else if (value < SLIDER_MIN) {
            value = SLIDER_MIN;
        }

        // Locate existing item in array
        const found = selections.find(s => s.name === selection.name);
        const index = selections.indexOf(found);

        // Update existing item in array
        const sels = [...selections];
        sels[index] = {...selection, value};
        setSelections(sels);
    };

    return (
        <>
            {
                selections.map((selection, index) => {
                    return (
                        <div key={`div-${index}`}>
                            <h3 key={`label-${index}`}>{index + 1}. {selection.name}</h3>

                            <Grid>
                                <Grid item>
                                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                        <TextField key={`input-${index}`}
                                                   variant={'outlined'}
                                                   size={'small'}
                                                   type={'number'}
                                                   value={selection.value}
                                                   style={{ marginRight: '15px', padding: '6px', minWidth: '5vw' }}
                                                   onChange={(event) => updateWeightValues(event, selection)}></TextField>
                                        <Typography variant={'caption'}>Less Important</Typography>
                                        <Slider
                                            key={`slider-${index}`}
                                            min={0}
                                            max={10}
                                            style={{ margin: '15px', color: COLORS[index % COLORS.length] }}
                                            getAriaLabel={() => selection.name}
                                            valueLabelDisplay="auto"
                                            value={selection.value}
                                            onChange={(event, value) => updateWeightValues(event, selection, value)}
                                        />
                                        <Typography variant={'caption'}>More Important</Typography>
                                        <FaInfoCircle style={{ marginLeft: '2rem', width: '2rem', height: '2rem', cursor: 'pointer' }}
                                                      color={COLORS[index % COLORS.length]}
                                                      onClick={(e) => {
                                                          setSelectedDetails({
                                                              name: selection.name,
                                                              description: dataDescriptions[selection.name],
                                                              value: 5
                                                          });
                                                          e.stopPropagation();
                                                          e.preventDefault();
                                                      }}></FaInfoCircle>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </div>
                    );
                })
            }
        </>
    );
}

/** Given a set of selected indicators, display the weight distribution for all indicators */
export const WeightsPieChart = ({ selections }) =>
    <PieChart
        skipAnimation
        colors={COLORS}
        sx={{
            [`& .${pieArcLabelClasses.root}`]: {fill: 'white' },
        }}
        series={[
            {
                data: selections.map((sel, index) => ({
                    ...sel,
                    id: `pie-slice-${index + 1}`,
                    label: `${index + 1}`
                })),
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                arcLabel: (item) => {
                    const total = selections.reduce((total, currentValue) => total + currentValue.value, 0);
                    return total > 0 ? `${(100 * item.value / total).toFixed(0)}%` : ''
                },
                cx: 200,
                arcLabelMinAngle: 20,
            }
        ]}
        width={500}
        height={300}
    />

