import React from 'react';
import { useSelector } from 'react-redux';

import { Slider } from '../Slider';
import { ReviewItem } from '../ReviewItem';
import { Loading } from '../Loading';
import { ErrorBlock } from '../ErrorBlock';
import './index.css';

export function ReviewBlock() {
  const loading = useSelector(state => state.review.loading);
  const reviewArray = useSelector(state => state.review.reviewArray);
  const error = useSelector(state => state.review.error);

  if (error) {
    return (
      <div className={"reviewBlock"}>
        <ErrorBlock error={error} />
      </div>
    );
  }

  return (
    <div className={"reviewBlock"}>
      {
        loading ? (
          <Loading text={"Loading reviews"} withDots block />
        ) : (
          <Slider
            slides={reviewArray}
            renderComponent={({ item, key }) => <ReviewItem item={item} key={key} />}
          />
        )
      }
    </div>
  );
}
