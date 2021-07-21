import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {  createTheme } from '@material-ui/core';
import { ThemeSwitcherProvider } from "mui-theme-switcher";
const darkTheme = createTheme({
  palette: {
    type: "dark"
  }
});

const lightTheme = createTheme({});

ReactDOM.render(
  <ThemeSwitcherProvider
    lightTheme={lightTheme}
    darkTheme={darkTheme}
    defaultTheme="dark"
  >
    <App />
  </ThemeSwitcherProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
