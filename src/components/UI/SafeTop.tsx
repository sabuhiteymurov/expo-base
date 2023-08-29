import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from 'constants/Colors'; 

interface IProps {
  bgColor?: string;
  style?: any;
}

const SafeTop = ({ bgColor, style }: IProps) => {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          height: safeAreaInsets.top,
          backgroundColor: bgColor ? bgColor : colors.light.white,
        },
        style,
      ]}
    />
  );
};

export default SafeTop;
