import { useRouter } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';
import Text from '../components/UI/Text';
import { storage } from '../helpers/storage';

const Profile = () => {
  const router = useRouter();

  const handleSignOut = () => {
    storage.delete('user');
    router.push('/sign-in');
  };

  return (
    <View style={styles.container}>
      <Text>Profile screen</Text>
      <Button title='Sign out' onPress={handleSignOut} />
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
