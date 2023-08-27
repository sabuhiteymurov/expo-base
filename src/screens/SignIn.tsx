import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';
import { storage } from 'helpers/storage';
import { useTranslation } from 'react-i18next';

const SignIn = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const navigateToDashboard = () => {
    // Important note: Currently, React Native MMKV is not supported in Expo Go.
    // Instead, consider using Expo Dev Build.
    // Alternatively, you can find a workaround by using react-native-async-storage.
    storage.set('user', JSON.stringify({ name: 'John Doe', age: 23 }));
    router.push('/home');
  };

  return (
    <View style={styles.container} testID='sign-in-screen'>
      <Text>{t('signIn:title')}</Text>
      <Button title={t('signIn:goToDashboard')} onPress={navigateToDashboard} />
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
