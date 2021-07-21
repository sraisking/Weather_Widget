import { Grid, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
const ErrorPanel=()=>{
    return(
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <ErrorIcon color="secondary"/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>
                    Error fetching data
                </Typography>
            </Grid>
        </Grid>
    )
}
export default ErrorPanel