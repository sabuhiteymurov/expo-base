import { useRouter } from 'expo-router';
import { Button, StyleSheet} from 'react-native';
import { View, Text } from 'components/UI/Themed';
import { storage } from '../helpers/storage';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const handleSignOut = () => {
    storage.delete('user');
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
