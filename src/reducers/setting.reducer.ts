import types from 'types';

const INITIAL_STATE = {
  currentTheme: 'light',
};

const reducer = (state = INITIAL_STATE, { type, value }: any) => {
  switch (type) {
    case types.app.theme.changed:
      return {
        ...state,
        currentTheme: value,
      };
    default:
      return state;
  }
};

export default reducer;
