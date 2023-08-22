import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { ReactNode, useEffect } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '../store';

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();
  const navigationReady = useRootNavigationState()?.key;

  useEffect(() => {
    if (!navigationReady) return;
    const inAuthGroup = segments[0] === '(auth)';
    const inDashboardGroup = segments[0] === '(dashboard)';

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('(auth)/sign-in');
    } else if (user && !inDashboardGroup) {
      // Redirect away from the sign-in page.
      router.replace('(dashboard)/(tabs)/home');
    }
  }, [user, segments, navigationReady]);
}

export function ProvidersWrapper({ children }: { children: ReactNode }) {
  const user: {} | null = store.getState().app.user;
  const colorScheme = useColorScheme();

  useProtectedRoute(user);

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* Necessary for @gorhom/bottom-sheet */}
        <RootSiblingParent>
          <SafeAreaProvider>
            {/* Necessary for @gorhom/bottom-sheet */}
            <GestureHandlerRootView style={{ flex: 1 }}>
              {children}
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </RootSiblingParent>
      </ThemeProvider>
    </Provider>
  );
}
