import { Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'components/UI/Themed';
import { useAppDispatch } from '../store';
import { setAppLanguage } from '../store/slices/appSlice';

const Home = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const changeLang = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      dispatch(setAppLanguage(lng));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container} testID='home-screen'>
      <Text>{t('home:title')}</Text>
      <Link href='/about'>
        <Text style={styles.link}>{t('home:goToAboutScreen')}</Text>
      </Link>
      <Text>{t('home:changeLang')}</Text>
      <View style={styles.btnContainer}>
        <Button title={t('home:english')} onPress={() => changeLang('en')} />
        <Button title={t('home:german')} onPress={() => changeLang('de')} />
      </View>
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
  btnContainer: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default Home;
