import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Loading }  from '../../components/Loading';
import { ReviewItem } from '../../components/ReviewItem';
import { Button } from '../../components/Button';
import { ErrorBlock } from '../../components/ErrorBlock';
import ReviewForm from '../../components/ReviewForm';
import { loadReviewData, createNewReview } from '../../store/review/actions';
import AppTypes from '../../store/app/types';
import './index.css';

export function ReviewScreen() {
  const loading = useSelector(state => state.review.loading);
  const error = useSelector(state => state.review.error);
  const reviewArray = useSelector(state => state.review.reviewArray);
  const createLoading = useSelector(state => state.review.createLoading);
  const createError = useSelector(state => state.review.createError);
  const isDesktop = useSelector(state => state.app.isDesktop);
  const dispatch = useDispatch();
  const { t } = useTranslation('translation');

  useEffect(() => {
    dispatch(loadReviewData());
  }, [dispatch]);

  const handleCreateReview = async (form) => {
    await dispatch(createNewReview(form));
  };

  const handleToggleReviewForm = (value) => {
    dispatch({
      type: AppTypes.TOGGLE_MODAL,
      payload: {
        show: value,
        componentPath: value ? 'ReviewForm' : null,
        withOverlay: value,
        closeCallback: () => handleToggleReviewForm(false),
      }
    });
  };

  return (
    <div className={"reviewScreen"}>
      {
        error ? (
          <ErrorBlock error={error} />
        ) : (
          <Fragment>
            <div className={"reviewScreen_list"}>
              <div className={"reviewScreen_list__title"}>
                <span>{t('review.title')}</span>
              </div>
              <div className={"reviewScreen_list__items"}>
                {
                  loading ? (
                    <Loading text={"Loading reviews"} withDots block />
                  ) : (
                    reviewArray.map(review => (
                      <ReviewItem
                        page={true}
                        item={review}
                        key={review.date}
                      />
                    ))
                  )
                }
              </div>
              <Button
                className={`reviewScreen_modalBtn`}
                hidden={loading || error || isDesktop}
                onClick={() => handleToggleReviewForm(true)}
              >
                {t('review.form.createBtn')}
              </Button>
            </div>
            {
              isDesktop && (
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
