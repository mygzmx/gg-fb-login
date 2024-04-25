import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/globals.scss';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/views/dramabox/locales/en.json";
import esJson from "@/views/dramabox/locales/es.json";
import zhHansJson from "@/views/dramabox/locales/zhHans.json";
import zhJson from "@/views/dramabox/locales/zh.json";
import LogoutPage from "@/views/dramabox/Logout";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

(async () => {
  let fallbackLng = "en";
  try {
    const language = navigator.language;
    const lang = (language || '').split('-')?.[0];
    if (lang === "zh") {
      fallbackLng = "zhHans";
      if (language === "zh-HK" || language === "zh-TW") {
        fallbackLng = "zh";
      }
    } else if (lang === "es") {
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
        zhHans: zhHansJson,
        zh: zhJson,
      },
    });
  root.render(
    <React.StrictMode>
      <LogoutPage />
    </React.StrictMode>
  );
})();

