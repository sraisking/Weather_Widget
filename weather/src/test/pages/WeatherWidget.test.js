import React from 'react';
import { cleanup, fireEvent, getByRole, getByText, render, wait } from '@testing-library/react';
import WeatherWidget from '../../pages/WeatherWidget';
import axios from 'axios';
jest.mock('axios')
afterEach(cleanup);
const mockfn=jest.fn()
beforeEach(() => {
    const data = {
        data: {
            lat: 22.5739,
            lon: 88.372,
            timezone: "Asia/Kolkata",
            current: {
                dt: 1626860763,
                sunrise: 1626823986, sunset: 1626871941,
                temp: 32.97,
                feels_like: 39.97,
                pressure: 995,
                humidity: 75,
                dew_point: 27.94,
                uvi: 2.38,
                clouds: 75,
                visibility: 4000,
                wind_speed: 2.57,
                wind_deg: 110,
                weather: [{ id: 721, main: "Haze", description: "haze", icon: "50d" }]
            },
            daily: [
                {
                    dt: 1626845400, temp: {
                        day: 32.52, min: 26.87, max: 33.5, night: 28.68, eve: 32.75,
                        morn: 26.87
                    }, humidity: 61, dew_point: 24.02, wind_speed: 4.24, wind_deg: 143,
                    wind_gust: 6.87, weather: [{ id: 501, main: "Rain", description: "moderate rain", icon: "10d" }],
                    clouds: 100, pop: 0.76, rain: 4.34, uvi: 10.59
                },
            ]
        }


    }
    mockfn.mockResolvedValue(data)
   
})
it('Weather widget should be rendered and api call should be made once', async () => {
    axios.get.mockResolvedValue(mockfn());
    const { getByText ,getByRole} = render(<WeatherWidget location={{ latitude: '22', longitude: '24' }} />);
    //service call test
    await wait(() => {
        expect(getByText('Asia/Kolkata')).toBeTruthy();
        expect(getByText('Wednesday,21th July')).toBeTruthy();
        expect(getByText('HAZE')).toBeTruthy();
        expect(getByText('Humidity : 75')).toBeTruthy();
        expect(getByText('Clouds : 75')).toBeTruthy();
        expect(getByText('Dew point : 27.94')).toBeTruthy();
        expect(getByText('Wind speed : 2.57')).toBeTruthy();
        expect(getByRole('checkbox')).toBeTruthy();
    });
});