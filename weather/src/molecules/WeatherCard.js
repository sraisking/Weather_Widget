import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardHeader, Grid, CircularProgress, Typography, Box } from '@material-ui/core';
import axios from 'axios';
import DayBasedWeatherSnippet from '../organisms/DayBasedWeatherSnippet';
import { getDate, getDay, getMonth, isEmpty } from '../utils/WeatherWidgetUtils';
import CurrentDayWeather from '../organisms/CurrentDayWeather';
import MetricSwitch from '../atoms/MetricSwitch';
import SearchBox from '../atoms/Searchbox';
import ErrorPanel from '../organisms/ErrorPanel';
import { useThemeSwitcher } from "mui-theme-switcher";

const useStyles = makeStyles({
  root: {
    minWidth: "100vw",
    minHeight: "100vh"
  },
});

const WeatherCard = ({ locationDetails }) => {
  const classes = useStyles();
  const [userInputLocation, setUserInputLocation] = useState(null)
  const [weatherForecast, setWeatherForecast] = useState({});
  const [isError, setError] = useState(false);
  const [imperial, setImperial] = useState(false);
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(false);
  const { dark, toggleDark } = useThemeSwitcher();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        let fetchedCitiesGeoLocation;
        setLoading(true);
        if (userInputLocation === null) {
          result = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?&units=${unit}&lat=${locationDetails.latitude}&lon=${locationDetails.longitude}&appid=11ab70ad14039b5b8971613e0c1c91b6`
          );
          setWeatherForecast(result.data);
        }
        else {
          fetchedCitiesGeoLocation = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${userInputLocation}&limit=5&appid=11ab70ad14039b5b8971613e0c1c91b6`)
          result = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?&units=${unit}&lat=${fetchedCitiesGeoLocation.data[0].lat}&lon=${fetchedCitiesGeoLocation.data[0].lon}&appid=11ab70ad14039b5b8971613e0c1c91b6`
          );
          setWeatherForecast(result.data);
        }
        setLoading(false)
      }
      catch (err) {
        setError(true)
      }
    }
    fetchData();
  }, [unit, userInputLocation]);


  const getTitle = () => {
    return weatherForecast.timezone
  }
  const getSubheader = () => {
    const { dt } = weatherForecast.current || {}
    return `${getDay(dt)},${getDate(dt)}th ${getMonth(dt)}`
  }
  const handleUnitChange = () => {
    setImperial(!imperial);
    imperial ? setUnit("imperial") : setUnit("metric")
  }
  const onClick = (value) => {
    setUserInputLocation(value)
  }
  const renderWeatherBody = () => (
    <>
      {
        loading ? <Box width="100%" display="flex" justifyContent="center">< CircularProgress /></Box > : <CardHeader
          title={getTitle() || null}
          subheader={getSubheader() || null}
          action={
            <SearchBox onClick={onClick} />
          }
        />
      }
      <CardContent>
        {((loading || isEmpty(weatherForecast))) ? <Box width="100%" display="flex" justifyContent="center"><CircularProgress /></Box> : <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <CurrentDayWeather weatherForecast={weatherForecast.current} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {weatherForecast !== null && weatherForecast.daily !== undefined && weatherForecast.daily.map((day, index) => {

                return (
                  <Grid item key={`${index}${index * 2}`}>
                    <DayBasedWeatherSnippet weatherForecast={day} />
                  </Grid>
                )
              })

              }
            </Grid>
          </Grid>
        </Grid>}
      </CardContent>
      <CardActions>
        <Grid container spacing={2} justifyContent='space-between'>
          <Grid item>
            <Grid container spacing={2} justifyContent='flex-start'>
              <Grid item>
                <Typography>
                  Farhenhit
                </Typography>
              </Grid>
              <Grid item>
                <MetricSwitch checked={imperial} onChange={handleUnitChange} name="checkedC" />
              </Grid>
              <Grid item>
                <Typography>
                  Celsius
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
            <MetricSwitch checked={dark} onClick={() => { toggleDark() }} name="checkedd" />
            </Grid>
            <Grid item>
              <Typography>Toggle Dark Mode</Typography>
            </Grid>
          </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </>

  )

  return (
    <>
      {/* <CssBaseline /> */}
      <Card className={classes.root}>
        {!isError && renderWeatherBody()}
        {isError && (<ErrorPanel />)}
      </Card>
    </>
  )
}

export default WeatherCard