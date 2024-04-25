import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/globals.scss';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from "@/views/xskd/locales/zh.json";
import LogoutPage from "@/views/xskd/Logout";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

(async () => {
  await i18n
    .use(initReactI18next)
    .init({
    // debug: true,
      fallbackLng: "zh",
      interpolation: {
        escapeValue: false,
      },
      resources: {
        zh: zh,
      },
    });
  root.render(
    <React.StrictMode>
      <LogoutPage />
    </React.StrictMode>
  );
})();

