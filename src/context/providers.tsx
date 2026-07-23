import { useColorScheme } from 'react-native';
import { ReactNode } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from 'expo-router/react-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '../store';
import { SessionProvider } from './ctx';

const ProvidersWrapper = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        {/* Required root view for react-native-gesture-handler */}
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SessionProvider>
            <Provider store={store}>{children}</Provider>
          </SessionProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default ProvidersWrapper;
