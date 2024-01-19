import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {changeVariable} from "../../actions";
import {variablePresets} from "../../config";
import Grid from "@mui/material/Grid";
import React from "react";

const IndicatorDetails = ({ selectedDetails, setSelectedDetails }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <>
            <Button onClick={() => setSelectedDetails(undefined)}>&larr; Back to instructions</Button>
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
                <Button onClick={() => history.push('/data')}>More &rarr;</Button>
                <Button onClick={() => {
                    history.push('/map');
                    setTimeout(() => {
                        dispatch(changeVariable(variablePresets[selectedDetails.name]));
                    }, 1500);
                }}>Map &rarr;</Button>
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
