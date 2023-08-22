import { Text as DefaultText, TextProps } from 'react-native';

const Text = (props: TextProps) => {
  return (
    <DefaultText adjustsFontSizeToFit={false} minimumFontScale={1} {...props}>
      {props.children}
    </DefaultText>
  );
};

export default Text;
