import React from 'react';

import './index.css';

export function TooltipChart({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const formatter = (string) => {
    if (string.length === 1) string = `0${string}`;
    return string;
  };

  const getDisplayingDate = (value) => {
    const date = new Date(value);

    const YYYY = String(date.getFullYear());
    const MM = formatter(String(date.getMonth() + 1));
    const dd = formatter(String(date.getDate()));
    const hh = formatter(String(date.getHours()));
    const mm = formatter(String(date.getMinutes()));

    return `${YYYY}/${MM}/${dd} ${hh}:${mm}`;
  };

  return (
    <div className={"tooltipChart"}>
      <div className={"tooltipChart_time"}>
        <span>{getDisplayingDate(label)}</span>
      </div>
      <div className={"tooltipChart_price"}>
        <div className={"tooltipChart_price__dot"} />
        <span>{(payload[0].value).toFixed(2)}</span>
      </div>
    </div>
  );
}
