import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/globals.scss';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/views/webfic/locales/en.json";
import esJson from "@/views/webfic/locales/es.json";
import LogoutPage from "@/views/webfic/Logout";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

(async () => {
  let fallbackLng = "en";
  try {
    const language = navigator.language;
    const lang = (language || '').split('-')?.[0];
    if (lang === "es") {
      fallbackLng = "es";
    }
  } catch (e) {}

  await i18n
    .use(initReactI18next)
    .init({
    // debug: true,
      fallbackLng,
      interpolation: {
        escapeValue: false,
      },
      resources: {
        en,
        es: esJson,
      },
    });
  root.render(
    <React.StrictMode>
      <LogoutPage />
    </React.StrictMode>
  );
})();

