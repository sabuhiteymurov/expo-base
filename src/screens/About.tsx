import { Link } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Text from '../components/UI/Text';

const About = () => {
  return (
    <View style={styles.container}>
      <Text>About screen</Text>
      <Link href='/home'>
        <Text style={styles.link}>Go to home screen</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  link: {
    color: 'blue',
  },
});

export default About;
