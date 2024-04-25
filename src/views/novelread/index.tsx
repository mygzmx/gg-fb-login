import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/globals.scss';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/views/webfic/locales/en.json";
import LogoutPage from "@/views/novelread/Logout";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

(async () => {
  await i18n
    .use(initReactI18next)
    .init({
    // debug: true,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      resources: {
        en,
      },
    });
  root.render(
    <React.StrictMode>
      <LogoutPage />
    </React.StrictMode>
  );
})();

