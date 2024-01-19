import {colors} from "../../config";
import {FaMousePointer} from "@react-icons/all-files/fa/FaMousePointer";
import {FaHashtag} from "@react-icons/all-files/fa/FaHashtag";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Stack, Step, StepLabel, Stepper, TextField} from "@mui/material";
import {pieArcLabelClasses, PieChart} from "@mui/x-charts/PieChart";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import React from "react";
import DebugInfo from "./DebugInfo";

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

const WeightsSliders = ({ selections, setSelections }) => {

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

/** Weights page uses custom icons instead of numerical badges for the Steps */
const IndexBuilderStepIcon = ({ color, stepNumber, background }) => {
    switch(stepNumber) {
        case 1: return (<div>
            <FaMousePointer style={{ color, background, paddingLeft: '6px', paddingRight: '4px' }} />
        </div>)
        case 2: return (<div>
            <FaHashtag style={{ color, background }} />
        </div>)
        default: return (<></>)
    }
};

const WeightsHelperText = ({ selections }) => {
    const IconProps = { color: colors.white, background: colors.pink };
    const FirstIconProps = {...IconProps, stepNumber: 1};
    const SecondIconProps = {...IconProps, stepNumber: 2};

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Setting weights is <strong>important</strong>
            </Typography>
            <Typography component="div">
                Here's how you can adjust the weights for the individual indicators when creating the index:
            </Typography>
            <Grid style={{ marginBottom: '5vh' }}>
                <Grid item xs={8}>
                    <Stepper orientation={'vertical'}>
                        <Step key={'weights-step1'} active={true}>
                            <StepLabel StepIconComponent={IndexBuilderStepIcon}
                                       StepIconProps={FirstIconProps}>
                                <Typography variant="subtitle">
                                    Drag and move the horizontal separators to alter the weights. You can see the
                                    weights altering in percentage below, or
                                </Typography>
                            </StepLabel>
                        </Step>
                        <Step key={'weights-step2'} active={true}>
                            <StepLabel StepIconComponent={IndexBuilderStepIcon}
                                       StepIconProps={SecondIconProps}>
                                <Typography variant="subtitle">
                                    You can also change the weights by typing the weight values (0-10) in the input box
                                    next to the indicators.
                                </Typography>
                            </StepLabel>
                        </Step>
                    </Stepper>
                </Grid>
            </Grid>
            <DebugInfo data={selections}></DebugInfo>
        </>
    );
}

const WeightsPieChart = ({ selections }) =>
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

/** Given a set of selected indicators, allow user to set a weight for each indicator */
const WeightsStep = ({ selections, setSelections, setCurrentStep }) =>
    <Grid container spacing={2}>
        <Grid item xs={6} style={{ marginRight: '8vh' }}>
            <Button onClick={() => setCurrentStep('indicators')}>&larr; Back</Button>
            <Button onClick={() => setCurrentStep('summary')}>Next &rarr;</Button>

            <WeightsHelperText></WeightsHelperText>
            <WeightsPieChart selections={selections}></WeightsPieChart>
        </Grid>
        <Grid item xs style={{ paddingTop: '8vh' }}>
            <WeightsSliders selections={selections} setSelections={setSelections}></WeightsSliders>
        </Grid>
    </Grid>

export default WeightsStep;
