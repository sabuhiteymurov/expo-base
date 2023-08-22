import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { storage } from '@/src/helpers/storage';

const signIn = () => {
  const router = useRouter();

  const navigateToDashboard = () => {
    // Important note: Currently, React Native MMKV is not supported in Expo Go.
    // Instead, consider using Expo Dev Build.
    // Alternatively, you can find a workaround by using react-native-async-storage.
    // storage.set('user', JSON.stringify({ name: 'John Doe', age: 23 }));
    router.push('/home');
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: 20,
      }}
    >
      <Text>Sign In screen</Text>
      <Button title='Go to dashboard' onPress={navigateToDashboard} />
    </View>
  );
};

export default signIn;
