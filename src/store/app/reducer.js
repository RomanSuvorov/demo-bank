import Types from './types';
import { createReducer } from '../../sdk/helper';

const initialStore = {
  showSidebar: false,
  isMobile: false,
};

const reducer = {
  [Types.CHANGE_WINDOW_SIZE]: (draft, payload) => {
    if (!draft.isMobile && payload && draft.showSidebar) {
      draft.showSidebar = false;
    }
    draft.isMobile = payload;
  },

  [Types.TOGGLE_SIDEBAR]: draft => draft.showSidebar = !draft.showSidebar,
};

export default createReducer(reducer, initialStore);
