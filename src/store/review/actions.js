import Types from './types';
import sdk from '../../sdk';

export const loadReviewData = () => async (dispatch) => {
  dispatch({ type: Types.LOAD_REVIEW_START });

  try {
    const { reviewList } = await sdk.api.getReviewsData();

    dispatch({ type: Types.LOAD_REVIEW_SUCCESS, payload: reviewList });
  } catch (e) {
    dispatch({ type: Types.LOAD_REVIEW_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.LOAD_REVIEW_FINISH });
  }
}

export const loadReviewByAmount = (count = 1) => async (dispatch) => {
  dispatch({ type: Types.LOAD_REVIEW_START });

  try {
    const { reviewsList } = await sdk.api.getReviewsListByAmount(count);

    dispatch({ type: Types.LOAD_REVIEW_SUCCESS, payload: reviewsList });
  } catch (e) {
    dispatch({ type: Types.LOAD_REVIEW_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.LOAD_REVIEW_FINISH });
  }
}

export const createNewReview = (form) => async (dispatch) => {
  dispatch({ type: Types.CREATE_REVIEW_START });

  const newReview = {
    username: form.name,
    comment: form.description,
    date: Date.now(),
    email: form.email,
  };

  try {
    const { review } = await sdk.api.createReview(newReview);

    dispatch({ type: Types.CREATE_REVIEW_SUCCESS, payload: review });
  } catch (e) {
    dispatch({ type: Types.CREATE_REVIEW_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.CREATE_REVIEW_FINISH });
  }
}
