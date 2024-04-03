import Grid from "@mui/material/Grid";
import React from "react";

const DEBUG = false;
const DebugInfo = ({ data }) => {
    if (!DEBUG) { return (<></>); }

    return(
        <Grid>
            <Grid item xs={12}>
                <h2>DEBUG</h2>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </Grid>
        </Grid>
    );
}

export default DebugInfo;
