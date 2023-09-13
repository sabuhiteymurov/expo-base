import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../store';
import { setUser } from '../store/slices/appSlice';

const SignIn = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const navigateToDashboard = () => {
    dispatch(setUser({ name: 'John Doe', age: 23 }));

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
