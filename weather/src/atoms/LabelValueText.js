import React from 'react';
import { Grid, Typography } from '@material-ui/core';
const LabelValueText = ({ label, value }) => {
    return (
        <Grid container>
            <Grid item>
                <Typography>
                   {` ${label} : ${value}`}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default LabelValueText