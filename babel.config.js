module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      [
        'module-resolver',
        {
          alias: {
            '@': './',
          },
        },
      ],
      // Required for react-native-reanimated
      'react-native-reanimated/plugin',
    ],
  };
};
