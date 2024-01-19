import React, {useState} from 'react';
import {
    Stepper,
    Step,
    StepLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {NavBar} from "../index";

import IndicatorsStep from "../IndexBuilder/IndicatorsStep";
import WeightsStep from "../IndexBuilder/WeightsStep";


// TODO: Convert style={{ }} to styled-components

/** Paged wizard-like component to present indicators for selection + allow user to set the weights */
export default function IndexBuilder() {

    /** for example, see components/IndexBuilder/IndicatorsStep */
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
                            <IndicatorsStep selections={selections} setSelections={setSelections} setCurrentStep={setCurrentStep}></IndicatorsStep>
                        </>
                    }
                    {
                        currentStep === 'weights' && <>
                            <WeightsStep selections={selections} setSelections={setSelections} setCurrentStep={setCurrentStep}></WeightsStep>
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

