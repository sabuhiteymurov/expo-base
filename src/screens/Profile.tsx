import { Button, StyleSheet } from 'react-native';
import { View, Text } from 'components/UI/Themed';
import { useTranslation } from 'react-i18next';
import { useSession } from '../context/ctx';

const Profile = () => {
  const { signOut }: any = useSession();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text>{t('profile:title')}</Text>
      <Button title={t('profile:signOut')} onPress={signOut} />
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
