import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name='home/index'
        options={{
          title: t('home:title'),
          tabBarIcon: ({ focused }) =>
            focused
              ? require('assets/svg/home-active.svg')
              : require('assets/svg/home.svg'),
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
