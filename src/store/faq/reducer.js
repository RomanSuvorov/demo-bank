import Types from './types';
import { createReducer } from '../../sdk/helper';

const initialStore = {
  loading: true,
  error: undefined,
  searchText: '',
  searchedFaqArray: [],
  faqArray: [],
  metaTags: [],
  chosenMetaTags: [],
};

const reducer = {
  //---------------- LOAD DATA FOR FAQ LIST ------------------//
  [Types.LOAD_FAQ_START]: draft => {
    draft.loading = true;
    draft.error = undefined;
  },

  [Types.LOAD_FAQ_ERROR]: (draft, payload) => draft.error = payload,

  [Types.LOAD_FAQ_SUCCESS]: (draft, payload) => {
    const { faqList, metaTags } = payload;

    draft.metaTags = !!metaTags ? metaTags : [];
    draft.faqArray = faqList;
    draft.error = undefined;
  },

  [Types.LOAD_FAQ_FINISH]: draft => draft.loading = false,

  [Types.SEARCH_BY_TEXT]: (draft, payload) => {
    draft.searchText = payload;
    const searchString = payload.trim().toLowerCase();

    if (searchString === '') {
      draft.searchedFaqArray = [];
    } else {
      draft.searchedFaqArray = draft.faqArray.filter(question => {
        if (
          (question.title && question.title.toLowerCase().indexOf(searchString) !== -1)
          || (question.description && question.description.toLowerCase().indexOf(searchString) !== -1)
        ) {
          return question;
        }
      });
    }
  },

  [Types.CHANGE_CHOSEN_TAGS]: (draft, payload) => {
    let result = [...draft.chosenMetaTags];

    if (!payload) {
      return draft.chosenMetaTags = [];
    }

    if (draft.chosenMetaTags.includes(payload)) {
      // remove tag from chosen
      result = result.filter(item => item !== payload);
    } else {
      // add tag to chosen tags
      result.push(payload);
    }

    draft.chosenMetaTags = [...result];
  },
};

export default createReducer(reducer, initialStore);
