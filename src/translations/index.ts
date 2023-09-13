import i18next from 'i18next';
import { getLocales } from 'expo-localization';
import { initReactI18next } from 'react-i18next';
import enHome from './locales/en/home.json';
import enProfile from './locales/en/profile.json';
import enSignIn from './locales/en/sign-in.json';
import deHome from './locales/de/home.json';
import deProfile from './locales/de/profile.json';
import deSignIn from './locales/de/sign-in.json';
import { reduxStorage } from '../store/storage';

// the translations
// (tip move them in a JSON file and import them)
const resources: any = {
  en: {
    home: enHome,
    profile: enProfile,
    signIn: enSignIn,
  },
  de: {
    home: deHome,
    profile: deProfile,
    signIn: deSignIn,
  },
} as const;
// This is for situations where the user can change the language in the app.
const lng: string | null = JSON.parse(
  JSON.parse(reduxStorage.getItem('persist:root')?.['_j']).app
).language;

// Generally, we should use the locale language as the default language.
const localeLng = getLocales()[0].languageCode as string;
const isLocaleLngSupported = resources?.[localeLng];

const defaultLocale = 'en';
export const currentLanguage = i18next.language || defaultLocale;

i18next
  .use(initReactI18next) // passes translations down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources,
    lng: lng ? lng : isLocaleLngSupported ? localeLng : 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

const t = i18next.t.bind(i18next);
export { t };
