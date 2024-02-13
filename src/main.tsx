/**
 * Import dependencies
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { clarity } from "react-microsoft-clarity";
import "./index.css";
import WebApp from "@twa-dev/sdk";
import App from "./App.tsx";

/**
 * Initialize WebApp
 */
WebApp.expand();
WebApp.setHeaderColor("#1976d2");
WebApp.setBackgroundColor("#1976d2");

/**
 * Setup Main Button
 */
const MainButton = WebApp.MainButton;
MainButton.setText("بازی");
MainButton.show();
MainButton.onClick(handleMainButtonClick);
MainButton.color = "#1976d2";
MainButton.textColor = "#FFFFFF";

function handleMainButtonClick() {
  alert("بازی فعلا داخل روبات قابل استفاده است، اینجا فقط اطلاعات میبینید.");
}

/**
 * Setup Back Button
 */
const BackButton = WebApp.BackButton;
BackButton.show();
BackButton.onClick(() => window.history.back());

/**
 * Setup Settings Button
 */
const SettingsButton = WebApp.SettingsButton;
SettingsButton.isVisible = true;

WebApp.ready();
clarity.init("kzhxxy2ip7");

/**
 * Render the application
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);
