import { useColorScheme } from 'react-native';
import { ReactNode } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '../store';
import { SessionProvider } from './ctx';

const ProvidersWrapper = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* Necessary for @gorhom/bottom-sheet */}
        <RootSiblingParent>
          <SafeAreaProvider>
            {/* Necessary for @gorhom/bottom-sheet */}
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SessionProvider>{children}</SessionProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </RootSiblingParent>
      </ThemeProvider>
    </Provider>
  );
};

export default ProvidersWrapper;
