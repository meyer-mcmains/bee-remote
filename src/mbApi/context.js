import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { NOTIFICATIONS, PLAY_STATE } from './notifications';
import { actions } from '@modules/player';
import endpoint from './endpoints';

const IP = `ws://${endpoint}:1201`;

const MusicBeeContext = React.createContext();

function MusicBee({ clear, children, trackChanged }) {
  const socket = useRef();
  const [isConnected, setIsConnected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const onMessage = useCallback(
    ({ data }) => {
      const { notification, sourceFile, ...otherData } = JSON.parse(data);

      switch (notification) {
        case PLAY_STATE.playing:
          setIsPlaying(true);
          break;

        case PLAY_STATE.paused:
          setIsPlaying(false);
          break;

        case NOTIFICATIONS.startup:
          const { position, playState } = otherData;
          console.log(position);

          switch (playState) {
            case PLAY_STATE.playing:
              setIsPlaying(true);
              break;

            case PLAY_STATE.paused:
            case PLAY_STATE.stopped:
              setIsPlaying(false);
          }
          break;

        case NOTIFICATIONS.trackChanged:
          trackChanged(sourceFile);
          break;

        case NOTIFICATIONS.nowPlayingListChanged:
          break;
      }
    },
    [trackChanged]
  );

  function onOpen() {
    setIsConnected(true);
  }

  function onClose() {
    setIsConnected(false);
  }

  useEffect(() => {
    if (!isConnected) {
      socket.current = new WebSocket(IP);
      if (socket.current) {
        socket.current.onopen = onOpen;
        socket.current.onmessage = onMessage;
        socket.current.onclose = onClose;
      }
    }
  }, [isConnected, onMessage]);

  return (
    <MusicBeeContext.Provider
      value={{
        isConnected,
        isPlaying
      }}
    >
      {children}
    </MusicBeeContext.Provider>
  );
}

MusicBee.propTypes = {
  children: PropTypes.node.isRequired,
  clear: PropTypes.func.isRequired,
  trackChanged: PropTypes.func.isRequired
};

export const Provider = connect(null, {
  clear: actions.clear,
  trackChanged: actions.trackChanged
})(MusicBee);

export const Consumer = MusicBeeContext.Consumer;

export default MusicBeeContext;
