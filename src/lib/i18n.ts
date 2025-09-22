import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import de from "../locales/de.json";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import ja from "../locales/ja.json";
import zh from "../locales/zh.json";

i18n
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Pass to react-i18next
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      de: { translation: de },
      zh: { translation: zh },
      ja: { translation: ja },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
