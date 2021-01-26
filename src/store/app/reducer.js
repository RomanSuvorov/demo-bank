import Types from './types';
import { createReducer } from '../../sdk/helper';

const initialStore = {
  lang: 'uk',
  showSidebar: false,
};

const reducer = {
  [Types.TOGGLE_SIDEBAR]: draft => draft.showSidebar = !draft.showSidebar,

  [Types.CHANGE_LANGUAGE]: (draft, payload) => draft.lang = payload,
};

export default createReducer(reducer, initialStore);
