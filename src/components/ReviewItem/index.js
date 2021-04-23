import React from 'react';

import { getDate } from '../../sdk/helper';
import './index.css';

export function ReviewItem({ page = false, item }) {
  const { data, time } = getDate({ time: item.date, withTime: true });

  return (
    <div className={`reviewItem ${page ? 'page' : ''}`}>
      <div className={"reviewItem_details"}>
        <div className={"reviewItem_details__avatar"} />
        <div className={"reviewItem_details__user"}>
          <span className={"reviewItem_details__username"} title={item.username}>
            {item.username}
          </span>
          <span className={"reviewItem_details__date"}>{time}</span>
          <span className={"reviewItem_details__date"}>{data}</span>
        </div>
      </div>
      <div className={"reviewItem_comment"} title={item.comment}>
        <span>
          {item.comment}
        </span>
      </div>
    </div>
  );
}
