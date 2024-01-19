import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import {NavBar} from "../index";

import IndicatorsList from "../IndexBuilder/Indicators";
import IndicatorDetails from "../IndexBuilder/IndicatorDetails";
import IndexBuilderFooter from "../IndexBuilder/IndexBuilderFooter";
import {WeightsSliders, WeightsPieChart} from "../IndexBuilder/Weights";
import {IndicatorsHelperText, WeightsHelperText} from "../IndexBuilder/HelperText";

// TODO: Convert style={{ }} to styled-components

/** Paged wizard-like component to present indicators for selection + allow user to set the weights */
export default function IndexBuilder() {

    /** for example, see components/IndexBuilder/IndicatorsStep */
    const [steps] = useState(['indicators', 'weights', 'summary']);
    const [currentStep, setCurrentStep] = useState(steps[0]);

    // User's last-clicked tooltip icon
    const [selectedDetails, setSelectedDetails] = useState(undefined);

    // User's indicator/variable selections
    // TODO: Default selections?
    const [selections, setSelections] = useState([]);

    return (
        <>
            <NavBar />

            <Grid container spacing={2} style={{ marginTop:'4vh', marginBottom:'10vh', paddingLeft: '15vw', paddingRight: '15vw' }}>
                <Grid item xs={6}>
                    {
                        currentStep === 'indicators' && !selectedDetails &&
                            <IndicatorsHelperText />
                    }
                    {
                        currentStep === 'weights' && !selectedDetails && <>
                            <WeightsHelperText />
                            <WeightsPieChart selections={selections} />
                        </>
                    }
                    {
                        !!selectedDetails && <>
                            <IndicatorDetails selectedDetails={selectedDetails}
                                              setSelectedDetails={setSelectedDetails} />
                            {
                                currentStep === 'weights' && <WeightsPieChart selections={selections} />
                            }
                        </>
                    }
                </Grid>
                <Grid item xs style={{ paddingTop: '8vh' }}>
                    {
                        currentStep === 'indicators' && <>
                            <IndicatorsList selections={selections}
                                            setSelections={setSelections}
                                            setCurrentStep={setCurrentStep}
                                            setSelectedDetails={setSelectedDetails} />
                        </>
                    }
                    {
                        currentStep === 'weights' && <>
                            <WeightsSliders selections={selections}
                                            setSelections={setSelections}
                                            setSelectedDetails={setSelectedDetails} />
                        </>
                    }
                    {
                        currentStep === 'summary' && <>
                            <Typography variant={'h3'}>TBD</Typography>
                        </>
                    }
                </Grid>
            </Grid>

            <IndexBuilderFooter currentStep={currentStep} setCurrentStep={setCurrentStep} setSelections={setSelections} setSelectedDetails={setSelectedDetails}></IndexBuilderFooter>
        </>
    );
};

