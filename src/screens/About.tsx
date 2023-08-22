import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const About = () => {
  const router = useRouter();
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default About;
