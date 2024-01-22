import Button from "@mui/material/Button";
import React from "react";
import {colors} from "../../config";

const IndexBuilderFooter = ({ currentStep, setCurrentStep, setSelections, setSelectedDetails }) => {
    const reset = () => {
        setSelections([]);
        setSelectedDetails(undefined);
        setCurrentStep('indicators');
    }
    const step = (direction = 'next') => {
        switch(currentStep) {
            case 'indicators': {
                return direction === 'prev' ? null : setCurrentStep('weights');
            }
            case 'weights': {
                return direction === 'prev' ? setCurrentStep('indicators') : setCurrentStep('summary')
            }
            default: {
                return direction === 'prev' ? setCurrentStep('weights') : null;
            }
        }
    }
    return (
        <footer style={{
            // Sticky footer
            background: 'lightgrey',
            position: "fixed",
            bottom: 0,

            // TODO: container
            width: '100%',
            paddingLeft: '15vw',
            paddingRight: '15vw',
        }}>
            <center>
                <Button style={{ marginRight: '25vw', color: colors.forest }}
                        onClick={() => step('prev')}>
                    &larr; Back
                </Button>
                <Button style={{ textAlign: 'center', color: colors.forest }}
                        onClick={() => reset()}>
                    Reset
                </Button>
                <Button style={{ marginBottom: '0.5rem', marginTop: '0.5rem', marginLeft:'25vw', backgroundColor: colors.forest, color: colors.white }}
                        onClick={() => step('next')}>
                    Next &rarr;
                </Button>
            </center>
        </footer>
    );
}

export default IndexBuilderFooter;
