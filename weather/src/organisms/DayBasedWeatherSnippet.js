import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import {getDay} from '../utils/WeatherWidgetUtils'
const DayBasedWeatherSnippet = ({ weatherForecast }) => {
    return (
        <div style={{padding:'8px'}}>
            <Grid container direction="column" alignContent="center">
            <Grid item>
                    <Typography>
                        {getDay(weatherForecast.dt)}
                    </Typography>
                </Grid>
                <Grid item>
                    <img src={`http://openweathermap.org/img/wn/${weatherForecast.weather[0].icon}@2x.png`} alt="ICON" />
                </Grid>
                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant="subtitle1">
                                {weatherForecast.temp.min}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                {weatherForecast.temp.max}
                            </Typography>
                        </Grid>
                    </Grid>


                </Grid>
            </Grid>
        </div>
    )
}
export default DayBasedWeatherSnippet