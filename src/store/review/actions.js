import Types from './types';

const reviewMock = [
  {
    username: 'Test1',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci asperiores, blanditiis ' +
      'culpa distinctio eligendi esse exercitationem impedit iste iusto nihil nobis optio perspiciatis quasi quibusdam ' +
      'recusandae reprehenderit temporibus veniam!',
    date: 1614000275279,
  },
  {
    username: 'Abramovish23324',
    comment: 'Lorem iit temporibus veniam!',
    date: 1614000175279,
  },
];

export const loadReviewData = () => async (dispatch) => {
  dispatch({ type: Types.LOAD_REVIEW_START });

  try {
    // TODO: await from server;
    const review = reviewMock;

    dispatch({ type: Types.LOAD_REVIEW_SUCCESS, payload: review });
  } catch (e) {
    dispatch({ type: Types.LOAD_REVIEW_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.LOAD_REVIEW_FINISH });
  }
}

export const loadReviewByAmount = (amount) => async (dispatch) => {
  dispatch({ type: Types.LOAD_REVIEW_START });

  try {
    // TODO: await from server;
    const review = [reviewMock[0]];

    dispatch({ type: Types.LOAD_REVIEW_SUCCESS, payload: review })
  } catch (e) {
    dispatch({ type: Types.LOAD_REVIEW_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.LOAD_REVIEW_FINISH });
  }
}

export const createNewReview = (form) => async (dispatch) => {
  dispatch({ type: Types.CREATE_REVIEW_START });

  const getMockReview = () => {
    return {
      username: form.name,
      comment: form.description,
      date: Date.now(),
    };
  };

  try {
    // TODO: await from server;
    const newReview = getMockReview();

    dispatch({ type: Types.CREATE_REVIEW_SUCCESS, payload: newReview });
  } catch (e) {
    dispatch({ type: Types.CREATE_REVIEW_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.CREATE_REVIEW_FINISH });
  }
}
