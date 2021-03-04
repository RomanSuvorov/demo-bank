import React, { useState } from 'react';

import { ArrowSmallLeft, ArrowSmallRight } from '../../assets/icons';
import './index.css';

export function Slider({ className, slides = [], renderComponent }) {
  const [state, setState] = useState({
    translate: 0,
    transition: 0.3,
    activeIndex: 0,
  });
  const { translate, transition, activeIndex } = state;

  const handleClickPrev = () => {
    if (activeIndex <= 0) {
      return setState(prevState => ({
        ...prevState,
        translate: `calc((100% / ${slides.length}) * ${slides.length - 1} * -1)`,
        activeIndex: slides.length - 1,
      }));
    }

    setState(prevState => ({
      ...prevState,
      translate: `calc((100% / ${slides.length}) * ${activeIndex - 1} * -1)`,
      activeIndex: activeIndex - 1,
    }));
  };

  const handleClickNext = () => {
    if (activeIndex === slides.length - 1) {
      return setState(prevState => ({
        ...prevState,
        translate: 0,
        activeIndex: 0,
      }));
    }

    setState(prevState => ({
      ...prevState,
      translate: `calc((100% / ${slides.length}) * ${activeIndex + 1} * -1)`,
      activeIndex: activeIndex + 1,
    }));
  };

  return (
    <div className={`slider ${className || ''}`}>
      <div
        className={"slider_content"}
        style={{
          transform: `translateX(${translate})`,
          transition: `transform ease-out ${transition}s`,
          width: `calc(100% * ${slides.length})`,
        }}
      >
        {
          slides.map((item, index) => (
            <div
              className={"slider_content__item"}
              style={{ width: `calc(100% / ${slides.length})` }}
              key={index}
            >
              {renderComponent({ item, key: index })}
            </div>
          ))
        }
      </div>

      <div className={"slider_content__navigation"}>
        <div
          className={"slider_content__arrow left"}
          onClick={handleClickPrev}
        >
          <ArrowSmallLeft />
        </div>
        <div className={"slider_content__dots"}>
          {
            slides.map((slide, index) => (
              <div key={index} className={`slider_content__dot ${activeIndex === index ? 'active' : ''}`} />
            ))
          }
        </div>
        <div
          className={"slider_content__arrow right"}
          onClick={handleClickNext}
        >
          <ArrowSmallRight />
        </div>
      </div>
    </div>
  );
}
