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
  ios: {
    supportsTablet: true,
  },
  android: {
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './src/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    favicon: './src/assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-localization',
    'expo-build-properties',
    [
      '@config-plugins/detox',
      {
        subdomains:
          process.env.EAS_BUILD_PROFILE === 'development'
            ? '*'
            : ['10.0.2.2', 'localhost'],
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
