import React, {useState} from 'react';

import {FaInfoCircle} from "@react-icons/all-files/fa/FaInfoCircle";
import {
    ToggleButton,
    TextField,
    Stepper,
    Step,
    StepLabel,
    Divider, Stack
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";

import {FaHashtag} from "@react-icons/all-files/fa/FaHashtag";
import {FaMousePointer} from "@react-icons/all-files/fa/FaMousePointer";
import {variablePresets, colors, dataDescriptions} from "../../config";
import {NavBar} from "../index";
import {PieChart} from "@mui/x-charts/PieChart";

const COLORS = [
    colors.pink,
    colors.red,
    colors.orange,
    colors.yellow,
    colors.paleyellow,
    colors.forest,
    colors.green,
    colors.chicagoDarkBlue,
    colors.blue,
    colors.lightblue,
    colors.purple
];

// TODO: Convert style={{ }} to styled-components

const DEBUG = false;
const DebugInfo = ({ selections }) => {
    if (!DEBUG) { return (<></>); }

    return(
        <Grid>
            <Grid item xs={12}>
                <h2>DEBUG</h2>
                <pre>{JSON.stringify(selections, null, 2)}</pre>
            </Grid>
        </Grid>
    );
}

/** Given a set of possible indicators (separated into categories), allow user to select one or more indicators */
const IndicatorsPage = ({ selections, setSelections, setCurrentStep }) => {

    // User's last-clicked tooltip icon
    const [selectedDetails, setSelectedDetails] = useState(undefined);

    const toggleSelection = (variableName) => {
        const localCopy = [...selections];

        // Check if item is selected
        const existing = localCopy.find(i => i.name === variableName);
        if (existing) {
            // Item is selected - de-select it
            const index = selections.indexOf(existing);
            localCopy.splice(index, 1);
            setSelections(localCopy);
        } else {
            // Item is not selected - select it
            setSelections(localCopy.concat([{
                name: variableName,
                description: dataDescriptions[variableName],
                value: 10
            }]));
        }
    };

    const IndicatorsHelperText = () =>
        <>
            <Typography variant="h4" gutterBottom>
                Let's create your <strong>Custom Index</strong>
            </Typography>
            <Typography component="div">
                Creating your custom index in 3 easy steps:
            </Typography>
            <Grid>
                <Grid item xs={8}>
                    <Stepper orientation={'vertical'}>
                        <Step key={'indicator-step1'} active={true}>
                            <StepLabel>
                                <Typography variant="subtitle">
                                    Select the indicators from the options on the right. If you want to know more
                                    about each indicator, click on the tooltip <FaInfoCircle></FaInfoCircle> icon
                                    to learn more about it.
                                </Typography>
                            </StepLabel>
                        </Step>
                        <Step key={'indicator-step2'} active={true}>
                            <StepLabel>
                                <Typography variant="subtitle">
                                    In the next step, set importance for each indicator you've selected to create
                                    an index that is tailored to your needs.
                                </Typography>
                            </StepLabel>
                        </Step>
                        <Step key={'indicator-step3'} active={true}>
                            <StepLabel>
                                <Typography variant="subtitle">
                                    Preview the summary of the selected indicators with their weights and the map
                                    preview with your selected criteria.
                                </Typography>
                            </StepLabel>
                        </Step>
                    </Stepper>
                </Grid>
            </Grid>
            <DebugInfo selections={selections}></DebugInfo>
        </>

    const IndicatorsDetails = ({ item }) =>
        <>
            <Button onClick={() => setSelectedDetails(undefined)}>&larr; Back to instructions</Button>
            {
                /*
                TODO: How do we place the correct icon?
                <i className={category?.icon}></i>
                */
            }
            <Typography variant="h5" gutterBottom>
                {item?.name}
            </Typography>
            <div>
                <Button>More &rarr;</Button>
                <Button>Map &rarr;</Button>
            </div>
            <Grid>
                <Grid item xs={9}>
                    <Typography variant={'body2'}>
                        {item?.description}
                    </Typography>
                </Grid>
            </Grid>
        </>

    const IndicatorsList = ({ selections }) =>
        <>
            {Object.keys(variablePresets).map((variable,i) => (
                variable.includes("HEADER::")
                    ? <div key={`list-header-${i}`}>
                        {
                            i > 0 && <Divider style={{ width: '20%', margin: '10px', fontWeight: 'bold' }}></Divider>
                        }
                        <h2>
                            {
                                /*
                                TODO: How do we place the correct icon?
                                <i className={category?.icon}></i>
                                */
                            }
                            {variable.split("HEADER::")[1]}
                        </h2>
                    </div>
                    : <IndicatorsSelectableItem style={{ margin: '10px' }} key={'variable-selectable-item-'+variable} selections={selections} variableName={variable}></IndicatorsSelectableItem>
            ))}
        </>

    const IndicatorsSelectableItem = ({ selections, variableName }) =>
        <ToggleButton style={{
            width: '8rem',
            height: '8rem',
            color: selections.find(i => i.name === variableName) ? colors.white : colors.forest,
            background: selections.find(i => i.name === variableName) ? colors.forest : colors.white,
            borderColor: colors.forest,
            borderWidth: '2px',
            marginTop: '10px',
            marginRight: '10px',
            padding: '0'
        }} onClick={() => toggleSelection(variableName)} value={variableName}>
            <FaInfoCircle style={{ zIndex: 99, right: '-6.5rem', top: '-3rem', position: 'relative', cursor: 'pointer' }}
                          color={colors.green}
                          onClick={(e) => {
                              setSelectedDetails({
                                  name: variableName,
                                  description: dataDescriptions[variableName],
                                  value: 10
                              });
                              e.stopPropagation();
                              e.preventDefault();
                          }}></FaInfoCircle>
            <Grid container spacing={3}>
                <Grid style={{ textAlign: 'left' }} item xs>
                    <Typography variant={'body2'}>{variableName}</Typography>
                </Grid>
            </Grid>
        </ToggleButton>


    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                {
                    !selectedDetails && <>
                        <Button disabled={true}>&larr; Back</Button>
                        <Button disabled={selections.length === 0} onClick={() => setCurrentStep('weights')}>Next &rarr;</Button>

                        <IndicatorsHelperText></IndicatorsHelperText>
                    </>
                }
                {
                    selectedDetails && <IndicatorsDetails item={selectedDetails}></IndicatorsDetails>
                }
            </Grid>
            <Grid item xs style={{ paddingTop: '8vh' }}>
                <IndicatorsList selections={selections}></IndicatorsList>
            </Grid>
        </Grid>
    );
}


/** Given a set of selected indicators, allow user to set a weight for each indicator */
const WeightsPage = ({ selections, setSelections, setCurrentStep }) => {
    const IconProps = { color: colors.white, background: colors.pink };
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
    const FirstIconProps = {...IconProps, stepNumber: 1};
    const SecondIconProps = {...IconProps, stepNumber: 2};

    const WeightsHelperText = () =>
        <>
            <Typography variant="h4" gutterBottom>
                Setting weights is <strong>important</strong>
            </Typography>
            <Typography component="div">
                Here's how you can adjust the weights for the individual indicators when creating the index:
            </Typography>
            <Grid>
                <Grid item xs={8}>
                    <Stepper orientation={'vertical'}>
                        <Step key={'weights-step1'} active={true}>
                            <StepLabel StepIconComponent={IndexBuilderStepIcon}
                                       StepIconProps={FirstIconProps}>
                                <Typography variant="subtitle">
                                    Drag and move the horizontal separators to alter the weights. You can see the
                                    weights altering in percentage on the right, or
                                </Typography>
                            </StepLabel>
                        </Step>
                        <Step key={'weights-step2'} active={true}>
                            <StepLabel StepIconComponent={IndexBuilderStepIcon}
                                       StepIconProps={SecondIconProps}>
                                <Typography variant="subtitle">
                                    You can also change the weights by typing the percentage values in the input box
                                    next to the indicators.
                                </Typography>
                            </StepLabel>
                        </Step>
                    </Stepper>
                </Grid>
            </Grid>

            <Grid>
                <Grid item>
                    <PieChart
                        colors={COLORS}
                        series={[
                            {
                                data: selections.map((sel, index) => ({ ...sel, id: index + 1 })),
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                arcLabel: (item) => `${item.id}`,
                                arcLabelMinAngle: 20,
                            }
                        ]}
                        width={500}
                        height={500}
                    />
                </Grid>
            </Grid>
            <DebugInfo selections={selections}></DebugInfo>
        </>

    const updateWeightValues = (event, selection, value) => {
        // Parse text value
        let intValue = parseInt(value || event.target.value, 10);

        // Min / max boundaries
        if (intValue > max) {
            intValue = max;
        } else if (value < min) {
            intValue = min;
        }

        // Locate existing item
        const found = selections.find(s => s.name === selection.name);
        const index = selections.indexOf(found);

        // Update existing item
        const sels = [...selections];
        sels[index] = {...selection, value: intValue};
        setSelections(sels);
    };


    const min = 0;
    const max = 10;
    return (
        <Grid container spacing={2}>
            <Grid item xs={6} style={{ marginRight: '8vh' }}>
                <Button onClick={() => setCurrentStep('indicators')}>&larr; Back</Button>
                <Button onClick={() => setCurrentStep('summary')}>Next &rarr;</Button>

                <WeightsHelperText></WeightsHelperText>
            </Grid>
            <Grid item xs style={{ paddingTop: '8vh' }}>
                {
                    selections.map((selection, index) => {
                        return (
                            <div key={`div-${index}`}>
                                <h3 key={`label-${index}`}>{index + 1}) {selection.name}</h3>

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
            </Grid>
        </Grid>


    );
}


/** Paged wizard-like component to present indicators for selection + allow user to set the weights */
export default function IndexBuilder() {

    const [steps] = useState(['indicators', 'weights', 'summary']);
    const [currentStep, setCurrentStep] = useState(steps[0]);

    // User's indicator/variable selections
    // TODO: Default selections?
    const [selections, setSelections] = useState([]);

    return (
        <div style={{ paddingLeft: '15vw', paddingRight: '15vw' }}>
            <NavBar />

            <Stepper style={{ marginTop: '15px' }} activeStep={currentStep === 'indicators' ? 0 : currentStep === 'weights' ? 1 : 2}>
                <Step onClick={() => setCurrentStep('indicators')}>
                    <StepLabel>Select Indicators</StepLabel>
                </Step>
                <Step onClick={() => setCurrentStep('weights')}>
                    <StepLabel>Choose Weights</StepLabel>
                </Step>
                <Step onClick={() => setCurrentStep('summary')}>
                    <StepLabel>Summary & Map</StepLabel>
                </Step>
            </Stepper>

            <Grid>
                <Grid item xs={12} style={{ padding: '8vh' }}>
                    {
                        currentStep === 'indicators' && <>
                            <IndicatorsPage selections={selections} setSelections={setSelections} setCurrentStep={setCurrentStep}></IndicatorsPage>
                        </>
                    }
                    {
                        currentStep === 'weights' && <>
                            <WeightsPage selections={selections} setSelections={setSelections} setCurrentStep={setCurrentStep}></WeightsPage>
                        </>
                    }
                    {
                        currentStep === 'summary' && <>
                            <Typography variant={'h3'}>TBD</Typography>
                        </>
                    }
                </Grid>
            </Grid>
        </div>
    );
};

