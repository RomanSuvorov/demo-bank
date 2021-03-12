import React from 'react';

import { getDate } from '../../sdk/helper';
import './index.css';

export function ReviewItem({ item }) {
  return (
    <div className={"reviewItem"}>
      <div className={"reviewItem_details"}>
        <div className={"reviewItem_details__avatar"} />
        <div className={"reviewItem_details__user"}>
          <span className={"reviewItem_details__username"} title={item.username}>
            {item.username}
          </span>
          <span className={"reviewItem_details__date"}>
            {getDate({ time: item.date })}
          </span>
        </div>
      </div>
      <div className={"reviewItem_comment"}>
        <span>
          {item.comment}
        </span>
      </div>
    </div>
  );
}
