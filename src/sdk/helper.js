import produce from 'immer';

export const createReducer = (cases = {}, defaultState = {}) =>
  (state = defaultState, action) => produce(state, draft => {
    if (action && action.type && cases[action.type] instanceof Function) {
      cases[action.type](draft, action.payload);
    }
  });
