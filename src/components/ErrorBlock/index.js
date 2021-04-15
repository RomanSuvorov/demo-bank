import React from 'react';

import './index.css';

export function ErrorBlock({ error }) {
  let errorText = undefined;
  if (error) {
    if (error.message) {
      errorText = error.message;
    } else {
      errorText = error;
    }
  }

  return (
    <div className={"errorBlock"}>
      <div className={"errorBlock_img"}>
        <span>!</span>
      </div>
      {
        error && (
          <div className={"errorBlock_text"}>
            <span>{errorText}</span>
          </div>
        )
      }
    </div>
  )
}
