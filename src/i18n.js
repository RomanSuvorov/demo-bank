import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['ua', 'ru', 'en'],
    fallbackLng: 'en',
    nonExplicitSupportedLngs: true,
    debug: process.env.NODE_ENV === 'development',
    // backend: {
    //   loadPath: 'https://storage.googleapis.com/testtranslate/{{lng}}.json',
    // },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
