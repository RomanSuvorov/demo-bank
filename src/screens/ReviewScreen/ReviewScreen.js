import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Loading,
  Review,
  Button,
} from '../../components';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import { loadReviewData, createNewReview } from '../../store/review/actions';
import AppTypes from '../../store/app/types';
import './ReviewScreen.css';

function ReviewScreen() {
  const {
    loading,
    error,
    reviewArray,
    createLoading,
    createError,
  } = useSelector(state => state.review);
  const { isMobile } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const { t } = useTranslation('translation');

  useEffect(() => {
    dispatch(loadReviewData());
  }, []);

  const handleCreateReview = async (form) => {
    await dispatch(createNewReview(form));
  };

  const handleToggleReviewForm = (value) => {
    dispatch({
      type: AppTypes.TOGGLE_MODAL,
      payload: {
        show: value,
        componentPath: value ? 'ReviewForm/ReviewForm' : null,
        componentProps: {} ,
        withOverlay: value,
        closeCallback: () => handleToggleReviewForm(false),
      }
    });
  };

  return (
    <div className={"reviewScreen"}>
      {
        loading ? (
          <Loading text={"Loading data..."} />
        ) : (
          <Fragment>
            <div className={"reviewScreen_list"}>
              <div className={"reviewScreen_list__title"}>
                <span>{t('review.title')}</span>
              </div>
              <div className={"reviewScreen_list__items"}>
                {
                  reviewArray.map(review => (
                    <Review
                      item={review}
                      key={review.date}
                    />
                  ))
                }
              </div>
              <Button
                className={`reviewScreen_modalBtn`}
                hidden={!isMobile}
                onClick={() => handleToggleReviewForm(true)}
              >
                {t('review.form.createBtn')}
              </Button>
            </div>

            {
              !isMobile && (
                <ReviewForm
                  className={"reviewScreen_form"}
                  loading={createLoading}
                  error={createError}
                  onCreate={handleCreateReview}
                />
              )
            }
          </Fragment>
        )
      }
    </div>
  );
}

export { ReviewScreen };
