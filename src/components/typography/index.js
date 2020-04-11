import styled, { css } from 'styled-components/native';
import { Animated } from 'react-native';

const web = css`
  user-select: none;
`;

const textBase = css`
  color: ${p =>
    (p.color ? p.theme.color[p.color] : p.theme.color.textDefault) || p.color};
  ${p => (p.theme.device.isWeb ? web : '')};
`;

export const Title = styled.Text`
  ${textBase};
  font-family: ${p => p.theme.font.lobster};
  font-size: 40;
`;

export const SubTitle = styled.Text`
  ${textBase};
  font-family: ${p => p.theme.font.roboto.black};
  font-size: 28;
`;

export const H2 = styled.Text`
  ${textBase};
  font-family: ${p => p.theme.font.roboto.black};
  font-size: 24;
`;

export const BodyRegular = styled.Text`
  ${textBase};
  font-family: ${p => p.theme.font.roboto.regular};
  font-size: 14;
`;

const blackRegular = css`
  ${textBase};
  font-family: ${p => p.theme.font.roboto.black};
  font-size: 18;
`;

export const BlackRegular = styled.Text`
  ${blackRegular}
`;

export const AnimatedBlackRegular = styled(Animated.Text)`
  ${blackRegular};
`;

const blackSmall = css`
  ${textBase};
  font-family: ${p => p.theme.font.roboto.black};
  font-size: 14;
`;

export const BlackSmall = styled.Text`
  ${blackSmall}
`;

export const AnimatedBlackSmall = styled(Animated.Text)`
  ${blackSmall}
`;
