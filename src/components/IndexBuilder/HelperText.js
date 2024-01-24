import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Step, StepLabel, Stepper} from "@mui/material";
import {FaInfoCircle} from "@react-icons/all-files/fa/FaInfoCircle";
import {FaMousePointer} from "@react-icons/all-files/fa/FaMousePointer";
import {FaHashtag} from "@react-icons/all-files/fa/FaHashtag";
import {colors} from "../../config";
import React from "react";
import DebugInfo from "./DebugInfo";

/*


.MuiSvgIcon-root, .MuiStepLabel-iconContainer {
  color: #e83e8c !important;
}

.MuiSvgIcon-root > .MuiStepLabel-root > .MuiStepLabel-iconContainer {
  background: #e83e8c !important;
}

.MuiStepLabel-iconContainer > div > svg {
  border-radius: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 6px;
  padding-right: 4px;
  height: 24px;
  width: 24px;
}

.MuiStepLabel-iconContainer > div > svg:last-of-type {
  padding-left: 5px;
  padding-right: 5px;
}

.MuiStepConnector-root > .MuiStepConnector-line {
  border-color: #e83e8c !important;
}

 */




export const IndicatorsHelperText = ({ selections }) =>
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

export const WeightsHelperText = ({ selections }) => {
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
