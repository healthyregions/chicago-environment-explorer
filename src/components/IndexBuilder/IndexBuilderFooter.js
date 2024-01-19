import Button from "@mui/material/Button";
import React from "react";

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
            position: "fixed",
            bottom: 0,
            height: '2.5rem',
            width: '100%',
            background: 'lightgrey',
            paddingLeft: '15vw',
            paddingRight: '15vw',
        }}>
            <center>
                <Button style={{ marginRight: '25vw' }}
                        onClick={() => step('prev')}>
                    &larr; Back
                </Button>
                <Button style={{ textAlign: 'center' }}
                        onClick={() => reset()}>
                    Reset
                </Button>
                <Button style={{ marginLeft:'25vw' }}
                        onClick={() => step('next')}>
                    Next &rarr;
                </Button>
            </center>
        </footer>
    );
}

export default IndexBuilderFooter;
