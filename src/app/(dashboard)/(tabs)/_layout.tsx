import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarStyle: {},
      })}
    >
      <Tabs.Screen
        name='home/index'
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name='profile/index'
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
