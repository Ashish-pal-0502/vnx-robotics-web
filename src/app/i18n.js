import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationENG from "../components/localization/en/translation.json";
import translationJPN from "../components/localization/jp/translation.json";
import translationVNT from "../components/localization/vi/translation.json";

const resources = {
  en: { translation: translationENG },
  vi: { translation: translationVNT },
  ja: { translation: translationJPN },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "vi", "ja"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",

      // Normalize detected language (en-US → en)
      convertDetectedLanguage: (lng) => {
        const code = lng?.substring(0, 2).toLowerCase();
        if (["en", "vi", "ja"].includes(code)) return code;
        return "en";
      },
    },
  });

export default i18n;
