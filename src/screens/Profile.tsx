import { useRouter } from 'expo-router';
import { Button, StyleSheet } from 'react-native';
import { View, Text } from 'components/UI/Themed';
import { useTranslation } from 'react-i18next';
import { reduxStorage } from '../store/storage';
import { useAppDispatch } from '../store';
import { setUser } from '../store/slices/appSlice';

const Profile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleSignOut = () => {
    dispatch(setUser(null));
    router.push('/sign-in');
  };

  return (
    <View style={styles.container}>
      <Text>{t('profile:title')}</Text>
      <Button title={t('profile:signOut')} onPress={handleSignOut} />
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

export default Profile;
