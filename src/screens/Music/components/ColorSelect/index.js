import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { connect } from 'react-redux';
import { Animated, TouchableOpacity } from 'react-native';

import IconButton from '@components/IconButton';
import Artwork from '../Album/Artwork';
import { actions } from '@modules/library';

const size = css`
  height: 200;
  width: 200;
`;

const StyledTouchableOpacity = styled(TouchableOpacity).attrs({
  activeOpacity: 1.0
})`
  ${size};
  cursor: default;
`;

const CanvasContainer = styled(Animated.View)`
  ${size};
  position: relative;
`;

const SIZE = 50;
const CircleIconButton = styled(IconButton)`
  align-items: center;
  justify-content: center;
  background-color: ${p =>
    p.theme.color[p.status ? 'statusRed' : 'statusGreen']};
  width: ${SIZE};
  height: ${SIZE};
  /* border-radius: ${SIZE / 2}; */
`;

const ButtonContainer = styled.View`
  justify-content: space-around;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
`;

const ColorCircle = styled(Animated.View)`
  height: ${SIZE / 2};
  width: ${SIZE / 2};
  /* border-radius: ${SIZE / 4}; */
`;

const menu = new nw.Menu();

const ColorSelect = ({
  artist,
  changeColor,
  currentColor,
  file,
  textColor,
  title
}) => {
  const canvasRef = useRef();
  const [showSelect, setShowSelect] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [color] = useState(new Animated.Value());
  const [saveColor, setSaveColor] = useState(currentColor);

  // DropDown Animation
  const [circlePos] = useState(new Animated.Value(0));
  const [checkPos] = useState(new Animated.Value(0));
  const [expand] = useState(new Animated.Value(0));
  const [xPos] = useState(new Animated.Value(0));

  const toggleSelect = useCallback(
    (close = false, cancel = false, save = false) => () => {
      setShowCanvas(showCanvas => !showCanvas);
      cancel && setSaveColor(currentColor);
      !close && setShowSelect(showSelect => !showSelect);

      textColor.setValue(save ? saveColor : currentColor);

      // Animate DropDown
      const config = { toValue: close ? 0 : SIZE + 20, useNativeDriver: true };
      const animations = [
        Animated.spring(expand, { ...config, toValue: close ? 0 : 75 }),
        Animated.spring(checkPos, config),
        Animated.spring(circlePos, config),
        Animated.spring(xPos, config)
      ];

      Animated.stagger(200, close ? animations.reverse() : animations).start(
        () => {
          close && setShowSelect(showSelect => !showSelect);
          save && changeColor(artist, saveColor, title);
        }
      );
    },
    [
      artist,
      changeColor,
      checkPos,
      circlePos,
      currentColor,
      expand,
      saveColor,
      textColor,
      title,
      xPos
    ]
  );

  // may be worth adding a useMenu hook in the long run
  useEffect(() => {
    menu.items.map((_, i) => menu.removeAt(i));
    menu.append(
      new nw.MenuItem({ click: toggleSelect(), label: 'Select Color' })
    );
  }, [toggleSelect]);

  useEffect(() => {
    if (canvasRef.current && showSelect) {
      const ctx = canvasRef.current.getContext('2d');
      const { canvas } = ctx;
      const imageObj = new Image();
      imageObj.src = file;
      ctx.imageSmoothingEnabled = false;

      // get the scale
      const scale = Math.min(
        canvas.width / imageObj.width,
        canvas.height / imageObj.height
      );
      // get the top left position of the image
      const x = canvas.width / 2 - (imageObj.width / 2) * scale;
      const y = canvas.height / 2 - (imageObj.height / 2) * scale;
      ctx.drawImage(
        imageObj,
        x,
        y,
        imageObj.width * scale,
        imageObj.height * scale
      );
    }
  }, [file, showSelect]);

  const getColor = key => ({ nativeEvent }) => {
    const ctx = canvasRef.current.getContext('2d');
    const { canvas } = ctx;
    const { data } = ctx.getImageData(
      nativeEvent.layerX,
      nativeEvent.layerY,
      canvas.width,
      canvas.height
    );
    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    key === 'color' ? color.setValue(rgba) : setSaveColor(rgba);
    textColor.setValue(rgba);
  };

  const showSaved = () => textColor.setValue(saveColor);

  return showSelect ? (
    <CanvasContainer style={{ marginBottom: expand }}>
      <Artwork
        file={file}
        size="small"
        style={{ position: 'absolute', top: 0 }}
      />
      {showCanvas && (
        <canvas
          style={{
            cursor: 'crosshair',
            opacity: 0,
            zIndex: 1
          }}
          ref={canvasRef}
          height={200}
          width={200}
          onClick={getColor('saveColor')}
          onMouseMove={getColor('color')}
          onMouseLeave={showSaved}
        />
      )}
      <ButtonContainer>
        <Animated.View style={{ transform: [{ translateY: checkPos }] }}>
          <CircleIconButton
            onPress={toggleSelect(true, false, true)}
            icon="check"
            color="white"
          />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{ translateY: circlePos }]
          }}
        >
          <ColorCircle
            style={{
              backgroundColor: color
            }}
          />
          <ColorCircle
            style={{
              backgroundColor: saveColor
            }}
          />
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: xPos }] }}>
          <CircleIconButton
            onPress={toggleSelect(true, true)}
            icon="x"
            color="white"
            status
          />
        </Animated.View>
      </ButtonContainer>
    </CanvasContainer>
  ) : (
    <StyledTouchableOpacity
      activeOpacity={1.0}
      onContextMenu={({ nativeEvent }) => {
        menu.popup(nativeEvent.pageX, nativeEvent.pageY);
      }}
    >
      <Artwork file={file} size="small" />
    </StyledTouchableOpacity>
  );
};

ColorSelect.propTypes = {
  artist: PropTypes.string.isRequired,
  changeColor: PropTypes.func.isRequired,
  currentColor: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  textColor: PropTypes.object,
  title: PropTypes.string.isRequired
};

export default connect(null, {
  changeColor: actions.changeColor
})(ColorSelect);
