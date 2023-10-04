import { useRouter } from 'expo-router';
import { useSession } from 'context/ctx';
import { useEffect } from 'react';
import { Text, View } from 'components/UI/Themed';

const index = () => {
  const { isLoading }: any = useSession();
  const router = useRouter();

  console.log(isLoading);

  useEffect(() => {
    if (isLoading)
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 40 }}>Loading...</Text>
      </View>;
    else router.replace('(dashboard)/(tabs)/home');
  }, [isLoading]);
};

export default index;
