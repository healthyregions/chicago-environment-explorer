import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import {colors} from "../../config";
import styled from "styled-components";

const CenteredGrid = styled(Grid)`
  margin: 0.5rem 0;
`;
const Footer = styled.footer`
  // Sticky footer
  background: lightgrey;
  position: fixed;
  bottom: 0;

  // TODO: container
  width: 100%;
  padding-left: 15vw;
  padding-right: 15vw;
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
const LinkButton = styled(Button)`
  color: ${colors.forest};
`;

const IndexBuilderFooter = ({ currentStep, setCurrentStep, setSelections, setSelectedDetails, canNext }) => {
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
        <Footer>
            <CenteredGrid container spacing={3}>
                <Grid item xs={5} style={{ padding: 0 }} />
                <Grid item xs style={{ padding: 0 }}>
                    <LinkButton onClick={() => reset()}>Reset</LinkButton>
                </Grid>
                <Grid item xs={5} style={{ padding: 0 }} />
                <Grid item xs style={{ padding: 0 }}>
                    <PrimaryButton variant={'contained'} disabled={!canNext} onClick={() => canNext && step('next')}>Next &rarr;</PrimaryButton>
                </Grid>
            </CenteredGrid>
        </Footer>
    );
}

export default IndexBuilderFooter;
