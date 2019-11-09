import theme from '../theme';
const prefix = 'beeRemote/settings';

const initialState = {
  theme: {
    color: theme.color
  }
};

export const types = {
  CHANGE_THEME: `${prefix}/CHANGE_THEME`
};

export const actions = {
  changeTheme: colors => ({
    payload: colors,
    type: types.CHANGE_THEME
  })
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_THEME:
      return {
        ...state,
        theme: {
          ...state.theme,
          color: {
            ...state.theme.color,
            ...action.payload
          }
        }
      };
    default:
      return state;
  }
};
