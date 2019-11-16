/* eslint-disable sort-keys */
import { Platform } from 'react-native';

export const disableText = textColor => {
  const r = parseInt(textColor.slice(1, 3), 16);
  const g = parseInt(textColor.slice(3, 5), 16);
  const b = parseInt(textColor.slice(5, 7), 16);

  return `rgba(${r},${g},${b},0.6)`;
};

const theme = {
  color: {
    textDefault: '#FFFFFF',
    background: '#24242f',
    black: '#000',
    border: 'rgba(255,255,255,0.01)',
    primary: '#24242a',
    white: '#FFFFFF'
  },
  device: {
    isAndroid: Platform.OS === 'android',
    isIOS: Platform.OS === 'ios',
    isWeb: Platform.OS === 'web'
  },
  outrun: {
    Sunset: {
      title: '#FF6C11',
      border: '#FF3864',
      textDefault: '#2DE2E6',
      primary: '#261447',
      background: '#0D0221'
    },
    Midnight: {
      primary: '#023788',
      background: '#650D89',
      border: '#920075',
      textDefault: '#F6019D',
      other: '#D40078'
    },
    'Moon Chaser': {
      primary: '#241734',
      background: '#2E2157',
      textDefault: '#FD3777',
      border: '#F706CF',
      red: '#FD1D53'
    },
    'Sun Chaser': {
      textDefault: '#F9C80E',
      radicalRed: '#FF4365',
      primary: '#540D6E',
      background: '#791E94',
      border: '#541388'
    },
    '1500 S': {
      textDefault: '#FF0000',
      background: '#000000',
      border: '#222222',
      primary: '#111111',
      other: '#aaaaaa'
    }
  },
  font: {
    lobster: 'lobster',
    roboto: {
      black: 'roboto-black',
      regular: 'roboto-regular'
    }
  }
};

export default theme;
