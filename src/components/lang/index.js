import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { tanslationUz } from "./uz";
import { tanslationEn } from "./en";
import { tanslationRu } from "./ru";

i18n.use(initReactI18next).init({
  lang: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: tanslationEn },
    ru: { translation: tanslationRu },
    uz: { translation: tanslationUz },
  },
});

export default i18n;
