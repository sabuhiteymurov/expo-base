import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'expo-base',
  slug: 'expo-base',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/images/icon.png',
  scheme: 'expo-base',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
  },
  assetBundlePatterns: ['**/*'],
  extra: {
    eas: {
      projectId: '61107862-a218-4135-bc3d-159d054eff83',
    },
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.sabuhiteymurov.expobase',
  },
  android: {
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './src/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.sabuhiteymurov.expobase',
  },
  web: {
    bundler: 'metro',
    favicon: './src/assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-localization',
    [
      'expo-build-properties',
      {
        ios: {
          newArchEnabled: true,
        },
        android: {
          newArchEnabled: true,
        },
      },
    ],
    [
      '@config-plugins/detox',
      {
        subdomains: '*',
      },
    ],
  ],
  experiments: {
    tsconfigPaths: true,
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
};

export default config;
