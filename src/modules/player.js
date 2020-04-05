import { playAlbum, playPause } from '@mbApi';

const prefix = 'beeRemote/player';

const initialState = {
  error: null,
  nowPlaying: {
    album: null,
    artist: null,
    artwork: {
      color: '#FFF'
    },
    length: '00:00',
    nowPlayingList: []
  }
};

export const types = {
  CHANGE_TRACK: `${prefix}/CHANGE_TRACK`,
  CLEAR: `${prefix}/CLEAR`,
  ERROR: `${prefix}/ERROR`,
  PLAY_ALBUM: `${prefix}/PLAY_ALBUM`,
  PLAY_PAUSE: `${prefix}/PLAY_PAUSE`
};

export const actions = {
  clear: () => ({
    type: types.CLEAR
  }),

  playAlbum: ({
    albumID,
    artist,
    title,
    tracks,
    ...props
  }) => async dispatch => {
    try {
      await playAlbum(artist, title);
      dispatch({
        payload: {
          album: title,
          albumArtist: artist,
          nowPlayingList: tracks,
          ...props
        },
        type: types.PLAY_ALBUM
      });
      dispatch({
        payload: tracks[0],
        type: types.CHANGE_TRACK
      });
    } catch (e) {
      dispatch({ payload: e.message, type: types.ERROR });
    }
  },

  playPause: () => async dispatch => {
    try {
      await playPause();
    } catch (e) {
      dispatch({ payload: e.message, type: types.ERROR });
    }
  },

  trackChanged: track => (dispatch, getState) => {
    const {
      player: {
        nowPlaying: { nowPlayingList }
      }
    } = getState();
    if (nowPlayingList) {
      const nextTrack = nowPlayingList.find(tracks => tracks.path === track);
      if (nextTrack) {
        dispatch({
          payload: nextTrack,
          type: types.CHANGE_TRACK
        });
      }
    }
  }
};

export const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.CHANGE_TRACK:
      return {
        ...state,
        nowPlaying: { ...state.nowPlaying, ...payload }
      };

    case types.CLEAR:
      return initialState;

    case types.ERROR:
      return {
        ...state,
        error: payload
      };

    case types.PLAY_ALBUM:
      return {
        ...state,
        nowPlaying: { ...state.nowPlaying, ...payload }
      };

    default:
      return state;
  }
};
