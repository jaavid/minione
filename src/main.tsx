import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { clarity } from 'react-microsoft-clarity';

import WebApp from '@twa-dev/sdk'
import eruda from 'eruda'

eruda.init()
WebApp.ready();
clarity.init('kzhxxy2ip7');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
