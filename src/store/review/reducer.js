import Types from './types';
import { createReducer } from '../../sdk/helper';

const initialStore = {
  loading: true,
  error: undefined,
  reviewArray: [],

  createLoading: false,
  createError: undefined,
};

const reducer = {
  [Types.LOAD_REVIEW_START]: draft => {
    draft.loading = true;
    draft.error = undefined;
  },

  [Types.LOAD_REVIEW_SUCCESS]: (draft, payload) => {
    draft.reviewArray = payload;
    draft.error = undefined;
  },

  [Types.LOAD_REVIEW_ERROR]: (draft, payload) => draft.error = payload,

  [Types.LOAD_REVIEW_FINISH]: draft => draft.loading = false,

  [Types.CREATE_REVIEW_START]: draft => draft.createLoading = true,

  [Types.CREATE_REVIEW_SUCCESS]: (draft, payload) => {
    draft.reviewArray = [payload, ...draft.reviewArray];
    draft.createError = undefined;
  },

  [Types.CREATE_REVIEW_ERROR]: (draft, payload) => draft.createError = payload,

  [Types.CREATE_REVIEW_FINISH]: draft => draft.createLoading = false,
};

export default createReducer(reducer, initialStore);
