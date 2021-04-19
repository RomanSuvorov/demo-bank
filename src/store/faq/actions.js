import Types from './types';
import sdk from '../../sdk';

export const loadFaqData = () => async (dispatch) => {
  dispatch({ type: Types.LOAD_FAQ_START });

  try {
    const { faqList, metaTags } = await sdk.api.getFaqData();

    dispatch({ type: Types.LOAD_FAQ_SUCCESS, payload: { faqList, metaTags } });
  } catch (e) {
    dispatch({ type: Types.LOAD_FAQ_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.LOAD_FAQ_FINISH });
  }
}

export const loadFaqByAmount = (count = 1) => async (dispatch) => {
  dispatch({ type: Types.LOAD_FAQ_START });

  try {
    const { faqList } = await sdk.api.getFaqListByAmount(count);

    dispatch({ type: Types.LOAD_FAQ_SUCCESS, payload: { faqList } });
  } catch (e) {
    dispatch({ type: Types.LOAD_FAQ_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.LOAD_FAQ_FINISH });
  }
}
