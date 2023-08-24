import i18next from 'i18next';
import { getLocales } from 'expo-localization';
import { initReactI18next } from 'react-i18next';
import { storage } from '@/src/helpers/storage';
import { en } from './en';
import { de } from './de';

// the translations
// (tip move them in a JSON file and import them)
const resources: any = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
};

export function initI18next() {
  // This is for situations where the user can change the language in the app.
  const lng: string | undefined = storage.getString('appLanguage');

  // Generally, we should use the locale language as the default language.
  const localeLng = getLocales()[0].languageCode;

  i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      compatibilityJSON: 'v3',
      resources,
      lng: lng ? lng : resources?.[localeLng] ? localeLng : 'en',

      keySeparator: false, // we do not use keys in form messages.welcome

      interpolation: {
        escapeValue: false, // react already safe from xss
      },
    });
}
