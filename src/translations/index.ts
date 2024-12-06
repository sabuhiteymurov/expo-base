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
const rootStorage: string = reduxStorage.getItem('persist:root')?.[
  '_j'
] as string;
let lng: string | null = null;

try {
  lng = rootStorage ? JSON.parse(JSON.parse(rootStorage).app).language : null;
} catch (e) {
  console.error(e);
}

// Generally, we should use the locale language as the default language.
const localeLng = getLocales()[0].languageCode as string;
const isLocaleLngSupported = resources?.[localeLng];

const defaultLocale = 'en';
export const currentLanguage = i18next.language || defaultLocale;

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  resources,
  lng: lng ? lng : isLocaleLngSupported ? localeLng : defaultLocale,

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

const t = i18next.t.bind(i18next);
export { t };
