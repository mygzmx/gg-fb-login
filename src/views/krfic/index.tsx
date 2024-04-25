import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/globals.scss';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ko from "@/views/krfic/locales/ko.json";
import LogoutPage from "@/views/krfic/Logout";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

(async () => {
  await i18n
    .use(initReactI18next)
    .init({
    // debug: true,
      fallbackLng: 'ko',
      interpolation: {
        escapeValue: false,
      },
      resources: {
        ko,
      },
    });
  root.render(
    <React.StrictMode>
      <LogoutPage />
    </React.StrictMode>
  );
})();

