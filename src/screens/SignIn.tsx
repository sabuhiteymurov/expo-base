import { useRouter } from 'expo-router';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../store';
import { setUser } from '../store/slices/appSlice';

const SignIn = () => {
  const router = useRouter();
  const { t } = useTranslation();
  // const dispatch = useAppDispatch();

  const navigateToDashboard = async () => {
    // dispatch(setUser({ name: 'John Doe', age: 23 }));
    const tokens = JSON.stringify({
      accessToken: 'example-access-token',
      refreshToken: 'example-refresh-token',
    });
    if (Platform.OS === 'web') {
      localStorage.setItem('tokens', tokens);
    } else {
      await SecureStore.setItemAsync('tokens', tokens);
    }

    router.push('/home');
  };

  return (
    <View style={styles.container} testID='sign-in-screen'>
      <Text>{t('signIn:title')}</Text>
      <Button
        title={t('signIn:goToDashboard')}
        onPress={navigateToDashboard}
        testID='sign-in-btn'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 20,
  },
});

export default SignIn;
