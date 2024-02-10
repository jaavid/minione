import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { clarity } from 'react-microsoft-clarity';

import WebApp from '@twa-dev/sdk'
import eruda from 'eruda'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';



// Create an RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

const theme = createTheme({
  typography: {
    fontFamily: '"VazirMatn FD", serif',
  },
  direction: 'rtl',
});
eruda.init()
WebApp.ready();
clarity.init('kzhxxy2ip7');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CacheProvider value={cacheRtl}>
<ThemeProvider theme={theme}>
<React.StrictMode>
    <App />
  </React.StrictMode>
  </ThemeProvider>
  </CacheProvider>
)
