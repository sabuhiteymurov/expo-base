import { StyleSheet, View } from 'react-native';
import Text from '../components/UI/Text';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link href='/about'>
        <Text style={styles.link}>Go to about screen</Text>
      </Link>
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
  link: {
    color: 'blue',
  },
});

export default Home;
