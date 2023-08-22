import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  style?: any;
}

const SafeBottom = ({ style }: Props) => {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View
      style={[styles.safeBottom, style, { height: safeAreaInsets.bottom }]}
    ></View>
  );
};

const styles = StyleSheet.create({
  safeBottom: {
    width: '100%',
    backgroundColor: 'white',
  },
});

export default SafeBottom;
