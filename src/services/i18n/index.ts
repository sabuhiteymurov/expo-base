import i18n from 'i18next';
import { getLocales } from 'expo-localization';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import { en } from './en';
import { ar } from './ar';

// the translations
// (tip move them in a JSON file and import them)
const resources: any = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
  ur: {
    translation: ar,
  },
};

export async function initI18next() {
  const lng: any = await AsyncStorage.getItem('appLanguage');
  const localeLng = getLocales()[0].languageCode;

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      compatibilityJSON: 'v3',
      resources,
      lng: lng ? lng : resources?.[localeLng] ? localeLng : 'en',

      keySeparator: false, // we do not use keys in form messages.welcome

      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
}
