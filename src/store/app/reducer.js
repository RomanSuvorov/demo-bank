import Types from './types';
import { createReducer } from '../../sdk/helper';

const initialStore = {
  // media query
  isMobile: false,
  isTablet: false,
  isDesktop: false,

  // modal
  modalShow: false,
  modalComponentPath: null,
  modalComponentProps: {},
  modalClassName: '',
  modalWithOverlay: true,
  closeCallback: () => {},

  // map
  pinLoading: false,
  pinList: [],
  pinError: undefined,
};

const reducer = {
  // media query
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

  // modal
  [Types.TOGGLE_MODAL]: (draft, { show, componentPath, componentProps, className = '', withOverlay, closeCallback }) => {
    draft.modalShow = show;
    draft.modalComponentPath = componentPath;
    draft.modalComponentProps = componentProps;
    draft.modalClassName = className;
    draft.modalWithOverlay = withOverlay;
    draft.closeCallback = closeCallback;
  },

  // map
  [Types.LOAD_PIN_START]: draft => draft.pinLoading = true,

  [Types.LOAD_PIN_SUCCESS]: (draft, payload) => draft.pinList = payload,

  [Types.LOAD_PIN_ERROR]: (draft, payload) => draft.pinError = payload,

  [Types.LOAD_PIN_FINISH]: draft => draft.pinLoading = false,
};

export default createReducer(reducer, initialStore);
