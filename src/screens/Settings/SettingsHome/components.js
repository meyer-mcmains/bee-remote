import styled from 'styled-components/native';

const TOP_OFFSET = 14;
export const PADDING = 70;
const PADDING_LEFT = 150;

export const HeaderContainer = styled.View`
  top: ${TOP_OFFSET};
  z-index: 1;
  width: 100%;
  background-color: transparent;
  position: absolute;
`;
export const ScrollView = styled.ScrollView`
  height: ${p => (p.theme.device.isWeb ? '100vh' : '100%')};
  padding-top: ${PADDING};
  padding-bottom: ${PADDING};
  padding-left: ${PADDING_LEFT};
`;

export const TitleWrapper = styled.TouchableOpacity`
  left: -${PADDING_LEFT};
`;

export const Wrapper = styled.View`
  align-self: center;
  width: ${p => (p.theme.device.isWeb ? 1000 : 'auto')};
`;
