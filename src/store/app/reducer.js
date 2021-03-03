import Types from './types';
import { createReducer } from '../../sdk/helper';

const initialStore = {
  isMobile: false,
  isTablet: false,
  isDesktop: false,

  modalShow: false,
  modalComponentPath: null,
  modalComponentProps: {},
  modalClassName: '',
  modalWithOverlay: true,
  closeCallback: () => {},
};

const reducer = {
  [Types.CHANGE_WINDOW_SIZE]: (draft, payload) => {
    if (payload >= 1024) {
      draft.isMobile = false;
      draft.isTablet = false;
      draft.isDesktop = true;
    } else if (payload >= 768) {
      draft.isMobile = false;
      draft.isTablet = true;
      draft.isDesktop = false;
    } else if (payload >= 280) {
      draft.isMobile = true;
      draft.isTablet = false;
      draft.isDesktop = false;
    } else {
      draft.isMobile = false;
      draft.isTablet = false;
      draft.isDesktop = false;
    }
  },

  [Types.TOGGLE_MODAL]: (draft, { show, componentPath, componentProps, className = '', withOverlay, closeCallback }) => {
    draft.modalShow = show;
    draft.modalComponentPath = componentPath;
    draft.modalComponentProps = componentProps;
    draft.modalClassName = className;
    draft.modalWithOverlay = withOverlay;
    draft.closeCallback = closeCallback;
  },
};

export default createReducer(reducer, initialStore);
