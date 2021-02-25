import Types from './types';
import { createReducer } from '../../sdk/helper';

const initialStore = {
  loading: false,
  error: undefined,
  reviewArray: [],

  createLoading: false,
  createError: undefined,
};

const reducer = {
  [Types.LOAD_REVIEW_START]: draft => draft.loading = true,

  [Types.LOAD_REVIEW_SUCCESS]: (draft, payload) => draft.reviewArray = payload,

  [Types.LOAD_REVIEW_ERROR]: (draft, payload) => draft.error = payload,

  [Types.LOAD_REVIEW_FINISH]: draft => draft.loading = false,

  [Types.CREATE_REVIEW_START]: draft => draft.createLoading = true,

  [Types.CREATE_REVIEW_SUCCESS]: (draft, payload) => {
    draft.createError = undefined;
    draft.reviewArray = [payload, ...draft.reviewArray];
  },

  [Types.CREATE_REVIEW_ERROR]: (draft, payload) => draft.createError = payload,

  [Types.CREATE_REVIEW_FINISH]: draft => draft.createLoading = false,
};

export default createReducer(reducer, initialStore);
