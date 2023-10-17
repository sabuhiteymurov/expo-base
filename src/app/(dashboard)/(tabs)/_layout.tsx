import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {},
      })}
    >
      <Tabs.Screen
        name='home/index'
        options={{
          title: t('home:title'),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='profile/index'
        options={{
          title: t('profile:title'),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
