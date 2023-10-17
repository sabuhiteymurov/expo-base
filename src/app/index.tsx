import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'components/UI/Themed';
import { useNavigationReady } from '../hooks/useNavigationReady';

const index = () => {
  const navigationReady = useNavigationReady();
  const router = useRouter();

  useEffect(() => {
    // We can't use the router here as it's not initialized yet.
    // Instead, render a loading screen until the navigation tree is ready.
    if (!navigationReady)
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 40 }}>Loading...</Text>
      </View>;
    else router.replace('(dashboard)/(tabs)/home');
  }, [navigationReady]);
};

export default index;
