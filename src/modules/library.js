import { getArtwork, getLibrary, getPulse } from '@mbApi';
import { mkdir, writeFile } from '@utils/filesystem';
import { merge, updateByField } from '@utils/transforms';
import uuid from 'uuidv4';

const prefix = 'beeRemote/library';

const initialState = { data: [], isPending: false };

export const types = {
  ADD_ARTIST: `${prefix}/ADD_ARTIST`,
  CHANGE_COLOR: `${prefix}/UPDATE_COLOR`,
  GET_LIBRARY: `${prefix}/GET_LIBRARY`,
  PENDING: `${prefix}/PENDING`,
  SUCCESS: `${prefix}/SUCCESS`,
  UPDATE_ARTIST: `${prefix}/UPDATE_ARTIST`,
  UPDATE_ARTWORK: `${prefix}/UPDATE_ARTWORK`,
  UPDATE_LIBRARY: `${prefix}/UPDATE_LIBRARY`
};

const ARTWORK_DIR = 'album-art';

const getImages = async (dispatch, library) => {
  await mkdir(ARTWORK_DIR);
  library.map(({ artist, albums }, index) => {
    albums.map(async ({ title }) => {
      const { data, isDark, color } = await getArtwork(artist, title);
      if (data) {
        const file = `${uuid()}.jpg`;
        await writeFile(data, ARTWORK_DIR, file);
        dispatch({
          payload: {
            album: title,
            artist,
            artwork: { color, file, isDark }
          },
          type: types.UPDATE_ARTWORK
        });
      }
    });
  });
};

export const actions = {
  changeColor: (artist, color, title) => dispatch => {
    dispatch({
      payload: {
        album: title,
        artist,
        color
      },
      type: types.CHANGE_COLOR
    });
  },
  getLibrary: () => async (dispatch, getState) => {
    try {
      if (!(await getPulse())) return false;
      const library = await getLibrary();
      dispatch({
        payload: { library },
        type: types.GET_LIBRARY
      });
      if (library) {
        getImages(dispatch, library);
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  updateLibrary: () => async (dispatch, getState) => {
    try {
      if (!(await getPulse())) return false;
      const nextLibrary = await getLibrary();
      const currentLibrary = getState().library.data;
      nextLibrary.map(nextItem => {
        if (currentLibrary.find(item => item.artist === nextItem.artist)) {
          dispatch({
            payload: { ...nextItem },
            type: types.UPDATE_ARTIST
          });
        } else {
          dispatch({
            payload: nextItem,
            type: types.ADD_ARTIST
          });
          // need to get artwork
        }
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};

export const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.ADD_ARTIST:
      return {
        ...state,
        data: [...state.data, payload]
      };
    case types.CHANGE_COLOR:
      return {
        ...state,
        data: updateByField(state.data, 'artist', payload.artist, artist => ({
          ...artist,
          albums: updateByField(
            artist.albums,
            'title',
            payload.album,
            album => ({
              ...album,
              artwork: {
                ...album.artwork,
                color: payload.color
              }
            })
          )
        })),
        isPending: true
      };
    case types.GET_LIBRARY:
      return {
        ...state,
        data: payload.library,
        isPending: true
      };
    case types.PENDING:
      return {
        ...state,
        isPending: true
      };
    case types.SUCCESS:
      return {
        ...state,
        isPending: false
      };
    case types.UPDATE_ARTIST:
      return {
        ...state,
        data: updateByField(state.data, 'artist', payload.artist, artist => ({
          ...artist,
          ...payload,
          albums: merge(artist.albums, payload.albums, 'title', 'artwork')
        }))
      };
    case types.UPDATE_ARTWORK:
      return {
        ...state,
        data: updateByField(state.data, 'artist', payload.artist, artist => ({
          ...artist,
          albums: updateByField(
            artist.albums,
            'title',
            payload.album,
            album => ({
              ...album,
              artwork: payload.artwork
            })
          )
        })),
        isPending: true
      };
    default:
      return state;
  }
};
