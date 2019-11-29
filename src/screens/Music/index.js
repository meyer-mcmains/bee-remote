import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Container from '@components/Container';
import Grid from './components/Grid';
// import Svg from '@components/Svg';

// import { useAsyncEffect } from '@hooks';
import { actions } from '@modules/library';
import { screenPropsType } from '@types';

const Music = ({
  getLibrary,
  // isPending,
  library,
  screenProps
  // updateLibrary
}) => {
  // const [result] = useAsyncEffect(updateLibrary);
  // const [result] = useAsyncEffect(getLibrary);
  const albums =
    library.length > 1 &&
    library.map(artist => artist.albums).reduce((acc, cur) => [...acc, ...cur]);

  return (
    <>
      {/* {typeof result !== 'boolean' && <Svg theme={screenProps.theme} />} */}
      {/* <Svg theme={screenProps.theme} /> */}
      <Container>
        <Grid data={albums} />
      </Container>
    </>
  );
};

Music.propTypes = {
  getLibrary: PropTypes.func.isRequired,
  library: PropTypes.array.isRequired,
  screenProps: screenPropsType
};

const mapStateToProps = ({ library }) => ({
  isPending: library.isPending,
  library: library.data
});

export default connect(mapStateToProps, {
  getLibrary: actions.getLibrary,
  updateLibrary: actions.updateLibrary
})(Music);
