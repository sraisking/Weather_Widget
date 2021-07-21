import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import WeatherCard from '../molecules/WeatherCard';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));
const WeatherWidget=(props)=>{
  
    const classes=useStyles();
    return(
        <div className={classes.root}>
            <Grid container spacing={2}>
                <WeatherCard locationDetails={props.location}/>
            </Grid>
        </div>
    )
}
export default WeatherWidget