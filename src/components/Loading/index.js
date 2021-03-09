import React from 'react';

import './index.css';

export function Loading({ text, withDots }) {
  return (
    <div className="loading">
      <div className="loading_line">
        <span className="loading_line__item item_1" />
        <span className="loading_line__item item_2" />
        <span className="loading_line__item item_3" />
        <span className="loading_line__item item_4" />
        <span className="loading_line__item item_5" />
        <span className="loading_line__item item_6" />
        <span className="loading_line__item item_7" />
        <span className="loading_line__item item_8" />
        <span className="loading_line__item item_9" />
      </div>
      {
        text && (
          <div className={"loading_text"}>
            <span className={"loading_text"}>{text}</span>
            {
              withDots && (
              <span className={"dots"}>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
              )
            }
          </div>
        )
      }
    </div>
  );
}

export function LoaderBall() {
  return (
    <div className={"loader"}>
      <div className="loader_item" />
      <div className="loader_item" />
      <div className="loader_item" />
      <div className="loader_item" />
      <div className="loader_item" />
      <div className="loader_item" />
      <div className="loader_item" />
      <div className="loader_item" />
    </div>
  )
}
