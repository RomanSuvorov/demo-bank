import React from 'react';
import { useSelector } from 'react-redux';

import { Slider } from '../Slider';
import { ReviewItem } from '../ReviewItem';
import './index.css';

export function ReviewBlock() {
  const {
    loading,
    reviewArray,
    error,
  } = useSelector(state => state.review);

  return (
    <div className={"reviewBlock"}>
      <Slider
        slides={reviewArray}
        renderComponent={({ item, key }) => <ReviewItem item={item} key={key} />}
      />
    </div>
  );
}
