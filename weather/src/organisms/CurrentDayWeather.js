import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import LabelValueText from '../atoms/LabelValueText';
import { constants } from '../utils/WeatherWidgetUtils';
const CurrentDayWeather = ({ weatherForecast }) => {
    return (
        <Grid container direction="row" alignContent="space-between" justifyContent='space-between'>
            <Grid item xs={4}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography>
                            {weatherForecast.weather[0].description.toUpperCase()}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row">
                            <Grid item>
                                <img src={`http://openweathermap.org/img/wn/${weatherForecast.weather[0].icon}@2x.png`} alt="ICON" />
                            </Grid>
                            <Grid item>
                                <Typography>
                                    {weatherForecast.temp}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                {Object.keys(constants).map((key, index) => {
                    return (
                        <div key={`${index}${index * 2}`}>

                            <LabelValueText label={constants[key]} value={weatherForecast[key]} />
                        </div>
                    )
                })
                }
            </Grid>

        </Grid>
    )
}
export default CurrentDayWeather