import styled, { css } from 'styled-components/native';

const web = css`
  user-select: none;
`;

const TextBase = styled.Text`
  color: ${p => (p.color ? p.theme.color[p.color] : p.theme.color.textDefault)};
  ${p => (p.theme.device.isWeb ? web : '')};
`;

export const Title = styled(TextBase)`
  font-family: ${p => p.theme.font.lobster};
  font-size: 40;
`;

export const SubTitle = styled(TextBase)`
  font-family: ${p => p.theme.font.roboto.black};
  font-size: 28;
`;
