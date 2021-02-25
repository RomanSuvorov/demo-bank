import React from 'react';

import { getDate } from '../../sdk/helper';
import './Review.css';

function Review({ item }) {
  return (
    <div className={"review"}>
      <div className={"review_details"}>
        <div className={"review_details__avatar"} />
        <div className={"review_details__user"}>
          <span className={"review_details__username"} title={item.username}>
            {item.username}
          </span>
          <span className={"review_details__date"}>
            {getDate({ time: item.date })}
          </span>
        </div>
      </div>
      <div className={"review_comment"}>
        <span>
          {item.comment}
        </span>
      </div>
    </div>
  );
}

export { Review };
