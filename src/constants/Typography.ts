export const typography: Typography = {
  titleLarge400: {
    fontSize: 32,
    fontFamily: 'sfpd-regular',
    lineHeight: 40,
    letterSpacing: 0.37,
  },
  titleLarge600: {
    fontSize: 32,
    fontFamily: 'sfpd-semibold',
    lineHeight: 40,
    letterSpacing: 0.37,
  },
  titleLarge700: {
    fontSize: 32,
    fontFamily: 'sfpd-bold',
    lineHeight: 40,
    letterSpacing: 0.37,
  },
};

interface Typography {
  titleLarge400: {
    fontSize: number;
    fontFamily: string;
    lineHeight: number;
    letterSpacing: number;
  };
  titleLarge600: {
    fontSize: number;
    fontFamily: string;
    lineHeight: number;
    letterSpacing: number;
  };
  titleLarge700: {
    fontSize: number;
    fontFamily: string;
    lineHeight: number;
    letterSpacing: number;
  };
}
