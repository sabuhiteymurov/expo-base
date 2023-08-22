import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { ProvidersWrapper } from '@/src/context/auth';
import { store } from '../store';
import { setIsConnectedToInternet } from '@/src/store/slices/appSlice';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(dashboard)/(tabs)/home',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'sfpd-regular': require('@/src/assets/fonts/SF-Pro-Display-Regular.ttf'),
    'sfpd-medium': require('@/src/assets/fonts/SF-Pro-Display-Medium.ttf'),
    'sfpd-semibold': require('@/src/assets/fonts/SF-Pro-Display-Semibold.ttf'),
    'sfpd-bold': require('@/src/assets/fonts/SF-Pro-Display-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Check internet connectivity
  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      store.dispatch(setIsConnectedToInternet(state.isConnected as boolean));
    });
    return () => unsubscribeNetInfo();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  } else return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ProvidersWrapper>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='(auth)/sign-in/index'
          options={{
            title: 'Sign In',
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name='(dashboard)/(tabs)'
          options={{
            headerShown: false,
            gestureEnabled: false,
            fullScreenGestureEnabled: false,
            animation: 'fade',
          }}
        />
      </Stack>
    </ProvidersWrapper>
  );
}
