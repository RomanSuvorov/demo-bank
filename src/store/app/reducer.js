import Types from './types';
import { createReducer } from '../../sdk/helper';

const initialStore = {
  isMobile: false,

  modalShow: false,
  modalComponentPath: null,
  modalComponentProps: {},
  modalClassName: '',
  modalWithOverlay: true,
  closeCallback: () => {},
};

const reducer = {
  [Types.CHANGE_WINDOW_SIZE]: (draft, payload) => draft.isMobile = payload,

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
