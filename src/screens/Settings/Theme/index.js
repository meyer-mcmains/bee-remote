import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { SubTitle } from '@components/typography';

import { actions } from '@modules/settings';
import { settingsScreenProps } from '@types';

const WEB_SIZE = 100;
const PHONE_SIZE = 50;
const ColorSquare = styled.TouchableOpacity`
  background-color: ${p => p.color};
  border-radius: ${p => (p.theme.device.isWeb ? WEB_SIZE : PHONE_SIZE) * 0.25};
  height: ${p => (p.theme.device.isWeb ? WEB_SIZE : PHONE_SIZE)};
  width: ${p => (p.theme.device.isWeb ? WEB_SIZE : PHONE_SIZE)};
  margin: 5px;
`;

const ColorContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 20;
  margin-bottom: 20;
`;

const Theme = ({ changeTheme, screenProps }) => {
  const { theme } = screenProps;
  return (
    <View>
      {Object.keys(theme.outrun).map(pallet => (
        <View key={pallet}>
          <SubTitle>{pallet}</SubTitle>
          <ColorContainer>
            {Object.keys(theme.outrun[pallet]).map(color => {
              const squareColor = theme.outrun[pallet][color];
              return (
                <ColorSquare
                  key={color}
                  color={squareColor}
                  onPress={() => {
                    changeTheme(theme.outrun[pallet]);
                    screenProps.updateTheme();
                  }}
                />
              );
            })}
          </ColorContainer>
        </View>
      ))}
    </View>
  );
};

Theme.propTypes = {
  changeTheme: PropTypes.func.isRequired,
  screenProps: settingsScreenProps
};

export default connect(null, {
  changeTheme: actions.changeTheme
})(Theme);
