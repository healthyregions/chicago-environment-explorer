import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Accordion, AccordionDetails, AccordionSummary, Step, StepContent, StepLabel, Stepper} from "@mui/material";
import {FaInfoCircle} from "@react-icons/all-files/fa/FaInfoCircle";
import {FaMousePointer} from "@react-icons/all-files/fa/FaMousePointer";
import {FaHashtag} from "@react-icons/all-files/fa/FaHashtag";
import {colors} from "../../config";
import React from "react";
import DebugInfo from "./DebugInfo";
import styled from "styled-components";

const IconBanner = styled.img`
  margin-top: 4rem;
`;
const css = `
    .MuiStepContent-root {
        border-left: 2px solid #e83e8c;
        margin-top: -1.75rem;
        padding-left: 2.5rem;
        padding-bottom: 1.5rem;
    }
    
    .MuiStepConnector-root > .MuiStepConnector-line {
        margin-bottom: -1.75rem;
        border-left-width: 2px
    }
    
    .MuiStepContent-last {
        border: none;
    }
`;

export const IndicatorsHelperText = ({ selections }) =>
    <>
        <style>{css}</style>
        <IconBanner alt="" src={'/icons/index-builder/banner.svg'} />
        <Typography variant="h6" gutterBottom style={{ fontWeight: 200 }}>
            Let's create your <strong>Custom Index</strong>
        </Typography>
        <Typography variant="subtitle2" style={{ marginTop: '3rem', fontWeight: 200 }}>
            Creating your custom index in 3 easy steps:
        </Typography>
        <Grid>
            <Grid item xs={8}>
                <Stepper orientation={'vertical'} style={{ marginTop: '1rem' }}>
                    <Step key={'indicator-step1'} active={true}>
                        <StepLabel></StepLabel>
                        <StepContent style={{ fontWeight: 200 }}>
                            Select the indicators from the options on the right. If you want to know more
                            about each indicator, click on the tooltip <FaInfoCircle></FaInfoCircle> icon
                            to learn more about it.
                        </StepContent>
                    </Step>
                    <Step key={'indicator-step2'} active={true}>
                        <StepLabel></StepLabel>
                        <StepContent style={{ fontWeight: 200 }}>
                            In the next step, set importance for each indicator you've selected to create
                            an index that is tailored to your needs.
                        </StepContent>
                    </Step>
                    <Step key={'indicator-step3'} active={true}>
                        <StepLabel></StepLabel>
                        <StepContent style={{ fontWeight: 200 }}>
                            Preview the summary of the selected indicators with their weights and the map
                            preview with your selected criteria.
                        </StepContent>
                    </Step>
                </Stepper>
            </Grid>
        </Grid>
        <DebugInfo data={selections}></DebugInfo>
    </>

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

export const readmeText = (colorScale) => "The process to compute this Custom Index is as follows: \r\n" +
    "    1. Loop over all GeoJSON features and for each selected indicator, determine mean and sample standard deviation, and use mean and standard deviation to compute zScore for each value (NaN values should be filtered out)\r\n" +
    "    2. For each GeoJSON feature, apply weights as a percentage of zScore value, and accumulate sum for each feature in CUSTOM_INDEX\r\n" +
    "    3. After weighted sums are accumulated, we should now have all CUSTOM_INDEX values - use these to determine min/max and scale from 0 to 1\r\n" +
    `    4. Use scaled values to determine quantile bins - right now the app assumes there are always ${colorScale.length - 1} partitions (aka ${colorScale.length} bins)\r\n` +
    "    5. Now that we have our scaled values and the quantile bins, we use the map to visualize the data contained in CUSTOM_INDEX_scaled\r\n";

export const WeightsHelperText = ({ selections }) => {
    const IconProps = { color: colors.white, background: colors.pink };
    const FirstIconProps = {...IconProps, stepNumber: 1};
    const SecondIconProps = {...IconProps, stepNumber: 2};

    return (
        <>
            <style>{css}</style>
            <div style={{ display:'inline-grid', width: 'auto' }}>
                <img style={{ marginTop: '4rem', display: 'flex', justifySelf: 'center' }} alt="" src={'/icons/index-builder/logo_scales.svg'} />

                <Typography variant="h6" gutterBottom style={{ fontWeight: 200, paddingBottom: '2rem' }}>
                    Setting weights is <strong>important</strong>
                </Typography>
            </div>
            <Typography variant="subtitle2" style={{ fontWeight: 200, paddingBottom: '1rem' }}>
                Here's how you can adjust the weights for the individual indicators when creating the index:
            </Typography>
            <Grid style={{ marginBottom: '5vh' }}>
                <Grid item xs={8}>
                    <Stepper orientation={'vertical'}>
                        <Step key={'weights-step1'} active={true}>
                            <StepLabel StepIconComponent={IndexBuilderStepIcon}
                                       StepIconProps={FirstIconProps}>
                                <Typography variant="body2" style={{ fontWeight: 200 }}>
                                    Drag and move the sliders to alter the weights. You can see the
                                    weights altering in percentage to the right, or
                                </Typography>
                            </StepLabel>
                        </Step>
                        <Step key={'weights-step2'} active={true}>
                            <StepLabel StepIconComponent={IndexBuilderStepIcon}
                                       StepIconProps={SecondIconProps}>
                                <Typography variant="body2" style={{ fontWeight: 200 }}>
                                    You can also change the weights by typing the weight values (0-100) in the input box
                                    next to the indicators.
                                </Typography>
                            </StepLabel>
                        </Step>
                    </Stepper>
                </Grid>
            </Grid>
            <Accordion>
                <AccordionSummary id="panel-header" aria-controls="panel-content">
                    How do we calculate the Custom Index?
                </AccordionSummary>
                <AccordionDetails dangerouslySetInnerHTML={{
                    __html: readmeText([1,2,3,4,5,6]).replaceAll('\r\n', '<br /><br />')
                }} />
            </Accordion>

            <Accordion>
                <AccordionSummary id="panel-header" aria-controls="panel-content">
                    Why is there a difference between numerical weight and the percentage applied?
                </AccordionSummary>
                <AccordionDetails>
                    Numerical weights may not add up to 100, so these may differ from the actual percentages.
                    <br /><br />
                    For example: suppose we have 3 weights of 10, 10, and 10 - these will add up to a total of 30.
                    <br />
                    10 / 30 = 1 / 3 = ~33.3333%
                </AccordionDetails>
            </Accordion>
            <DebugInfo data={selections}></DebugInfo>
        </>
    );
}
