import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {changeVariable} from "../../actions";
import {variablePresets} from "../../config";
import Grid from "@mui/material/Grid";
import React from "react";
import styled from "styled-components";
import { colors } from '../../config';

const GreenLinkButton = styled(Button)`
  color: ${colors.forest};
`;

const IndicatorDetails = ({ selectedDetails, setSelectedDetails }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <>
            <GreenLinkButton onClick={() => setSelectedDetails(undefined)}>&larr; Back to instructions</GreenLinkButton>
            {
                /*
                TODO: How do we choose the correct icon?
                <i className={category?.icon}></i>
                */
            }
            <Typography variant="h5" gutterBottom>
                {selectedDetails?.name}
            </Typography>
            <div>
                <GreenLinkButton onClick={() => history.push('/data')}>More &rarr;</GreenLinkButton>
                <GreenLinkButton onClick={() => {
                    history.push('/map');
                    setTimeout(() => {
                        dispatch(changeVariable(variablePresets[selectedDetails.name]));
                    }, 1500);
                }}>Map &rarr;</GreenLinkButton>
            </div>
            <Grid>
                <Grid item xs={9}>
                    <Typography variant={'caption'}>
                        {selectedDetails?.description}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default IndicatorDetails;
