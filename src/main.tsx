import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { clarity } from 'react-microsoft-clarity';

import WebApp from '@twa-dev/sdk'
// import eruda from 'eruda';
import { createTheme, ThemeProvider } from '@mui/material/styles';


WebApp.expand();

const MainButton = WebApp.MainButton;
MainButton.setText('بازی');
MainButton.show();
MainButton.onClick(() => alert('submitted'));
MainButton.color = '#1976d2';
MainButton.textColor = '#FFFFFF';

const BackButton = WebApp.BackButton;
BackButton.show();
BackButton.onClick(() => window.history.back());

const SettingsButton = WebApp.SettingsButton;
SettingsButton.isVisible = true;

WebApp.setHeaderColor('#1976d2');
WebApp.setBackgroundColor('#1976d2');


const theme = createTheme({
  typography: {
    fontFamily: '"VazirMatn FD", serif',
  },
});
// eruda.init();
WebApp.ready();
clarity.init('kzhxxy2ip7');

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
)
