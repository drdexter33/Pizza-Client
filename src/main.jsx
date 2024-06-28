import React from 'react'
import ReactDOM from 'react-dom/client'

{/*
  -------------------------------------------------------------------------------------
  Tutorial to build a full-stack SPA application using React and minimal API for ASP.Net Core.
  -------------------------------------------------------------------------------------
  https://learn.microsoft.com/en-us/training/modules/build-web-api-minimal-spa/1-introduction
  -------------------------------------------------------------------------------------
  1). Building a front-end app by using React.
  2). Using the React app to call the minimal API app. Configure the minimal API app to accept calls from the React app with CORS.
  3). Add a design system to the React app to improve usability.
  */}

//Importing Material UI styles
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

//create theme MUI
const theme = createTheme();

import Pizza from './Pizza'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Pizza className="Pizza"/>
    </ThemeProvider>
  </React.StrictMode>,
)