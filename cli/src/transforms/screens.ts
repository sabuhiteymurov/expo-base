import type { FeatureId } from '../types';
import { pathExists, readFile, resolve, writeFile } from '../utils/fs';

export async function transformScreens(
  projectDir: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  if (selectedFeatures.includes('i18n') && selectedFeatures.includes('state-management')) {
    // Both kept — only handle cross-dependency for translations/index.ts
    return;
  }

  await transformHome(projectDir, selectedFeatures);
  await transformProfile(projectDir, selectedFeatures);
  await transformSignIn(projectDir, selectedFeatures);
  await transformTranslationsIndex(projectDir, selectedFeatures);
}

async function transformHome(
  projectDir: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  const filePath = resolve(projectDir, 'src/screens/Home.tsx');
  if (!(await pathExists(filePath))) return;

  let content = await readFile(filePath);

  if (!selectedFeatures.includes('i18n')) {
    content = content.replace(
      /import \{ useTranslation \} from 'react-i18next';\n/,
      '',
    );
    // Remove the useTranslation destructuring
    content = content.replace(
      /\s*const \{ t, i18n \} = useTranslation\(\);\n/,
      '\n',
    );

    // Replace t() calls with English literals
    content = content.replace(/t\('home:title'\)/g, "'Home'");
    content = content.replace(/t\('home:goToAboutScreen'\)/g, "'Go to about screen'");
    content = content.replace(/t\('home:changeLang'\)/g, "'Change language'");
    content = content.replace(/t\('home:english'\)/g, "'English'");
    content = content.replace(/t\('home:german'\)/g, "'German'");
  }

  if (!selectedFeatures.includes('state-management')) {
    content = content.replace(
      /import \{ useAppDispatch \} from '\.\.\/store';\n/,
      '',
    );
    content = content.replace(
      /import \{ setAppLanguage \} from '\.\.\/store\/slices\/appSlice';\n/,
      '',
    );
    content = content.replace(
      /\s*const dispatch = useAppDispatch\(\);\n/,
      '\n',
    );
    // Remove dispatch(...) calls
    content = content.replace(/\s*dispatch\(setAppLanguage\(lng\)\);\n/g, '');
  }

  // If i18n removed, also remove changeLang function and language buttons
  if (!selectedFeatures.includes('i18n')) {
    // Remove changeLang function
    content = content.replace(
      /\s*const changeLang = async \(lng: string\) => \{[\s\S]*?\};\n/,
      '\n',
    );

    // Remove "Change language" text and button container
    content = content.replace(
      /\s*<Text>'Change language'<\/Text>\n/,
      '',
    );
    content = content.replace(
      /\s*<View style=\{styles\.btnContainer\}>[\s\S]*?<\/View>\n/,
      '',
    );

    // Remove btnContainer style
    content = content.replace(
      /\s*btnContainer: \{[\s\S]*?\},\n/,
      '\n',
    );
  }

  await writeFile(filePath, content);
}

async function transformProfile(
  projectDir: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  if (selectedFeatures.includes('i18n')) return;

  const filePath = resolve(projectDir, 'src/screens/Profile.tsx');
  if (!(await pathExists(filePath))) return;

  let content = await readFile(filePath);

  content = content.replace(
    /import \{ useTranslation \} from 'react-i18next';\n/,
    '',
  );
  content = content.replace(
    /\s*const \{ t \} = useTranslation\(\);\n/,
    '\n',
  );

  content = content.replace(/t\('profile:title'\)/g, "'Profile'");
  content = content.replace(/t\('profile:signOut'\)/g, "'Sign out'");

  await writeFile(filePath, content);
}

async function transformSignIn(
  projectDir: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  if (selectedFeatures.includes('i18n')) return;

  const filePath = resolve(projectDir, 'src/screens/SignIn.tsx');
  if (!(await pathExists(filePath))) return;

  let content = await readFile(filePath);

  content = content.replace(
    /import \{ useTranslation \} from 'react-i18next';\n/,
    '',
  );
  content = content.replace(
    /\s*const \{ t \} = useTranslation\(\);\n/,
    '\n',
  );

  content = content.replace(/t\('signIn:title'\)/g, "'Sign in screen'");
  content = content.replace(/t\('signIn:goToDashboard'\)/g, "'Go to dashboard'");

  await writeFile(filePath, content);
}

async function transformTranslationsIndex(
  projectDir: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  // If i18n is removed, the whole translations dir is deleted by cleanup.ts
  // Only need to handle: i18n kept but state-management removed
  if (!selectedFeatures.includes('i18n')) return;
  if (selectedFeatures.includes('state-management')) return;

  const filePath = resolve(projectDir, 'src/translations/index.ts');
  if (!(await pathExists(filePath))) return;

  // Rewrite without reduxStorage dependency
  const content = `import i18next from 'i18next';
import { getLocales } from 'expo-localization';
import { initReactI18next } from 'react-i18next';
import enHome from './locales/en/home.json';
import enProfile from './locales/en/profile.json';
import enSignIn from './locales/en/sign-in.json';
import deHome from './locales/de/home.json';
import deProfile from './locales/de/profile.json';
import deSignIn from './locales/de/sign-in.json';

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

const localeLng = getLocales()[0].languageCode as string;
const isLocaleLngSupported = resources?.[localeLng];

const defaultLocale = 'en';
export const currentLanguage = i18next.language || defaultLocale;

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  resources,
  lng: isLocaleLngSupported ? localeLng : defaultLocale,

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

const t = i18next.t.bind(i18next);
export { t };
`;

  await writeFile(filePath, content);
}
