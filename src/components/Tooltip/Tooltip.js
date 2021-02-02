import React, { useRef, useState, useEffect } from 'react';

import './Tooltip.css';

const POSITION = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
};

function Tooltip({ className, title, trigger, children }) {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [show, setShow] = useState(false);
  const showRef = useRef(show);
  const [centerCoords, setCenterCoords] = useState({ x: 0, y: 0 });
  const [targetCoords, setTargetCoords] = useState({ x: 0, y: 0 });

  const updateShow = data => {
    showRef.current = data;
    setShow(data);
  };

  useEffect(() => {
    findWorkAreaCenter();

    window.addEventListener("resize", findWorkAreaCenter);
    if (trigger === 'click') document.addEventListener("click", handleClickOutSide);
    if (trigger === 'touch') document.addEventListener("touchstart", handleClickOutSide);
    const scrolledContainer = document.getElementsByClassName('layout_wrapper')[0];
    if (scrolledContainer) {
      scrolledContainer.addEventListener("scroll", hideHandler);
    }
    return () => {
      window.removeEventListener("resize", findWorkAreaCenter);
      if (trigger === 'click') document.removeEventListener("click", handleClickOutSide);
      if (trigger === 'touch') document.removeEventListener("touchstart", handleClickOutSide);
      scrolledContainer.removeEventListener("scroll", hideHandler);
    }
  }, [trigger]);

  const handleClickOutSide = (e) => {
    if (showRef.current && containerRef.current && !containerRef.current.contains(e.target)) {
      hideHandler();
    }
  }

  const findWorkAreaCenter = () => {
    setCenterCoords({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    hideHandler();
  };

  const toggleHandler = (e) => show ? hideHandler(e) : showHandler();

  const showHandler = () => {
    if (targetCoords.x > 0 || targetCoords.y > 0) return;

    const { x, y, right, left, bottom, top } = containerRef.current.getBoundingClientRect();
    const targetCoordX = x - ((right - left) / 2);
    const targetCoordY = y - ((bottom - top) / 2);

    setTargetCoords({ x: targetCoordX, y: targetCoordY });

    updateShow(true);
  };

  const hideHandler = (e) => {
    if (e && e.target && tooltipRef.current && tooltipRef.current.contains(e.target)) {
      return;
    }

    updateShow(false);

    setTimeout(() => {
      setTargetCoords({ x: 0, y: 0 });
    }, 300);
  };

  return (
    <div
      className={`tooltip ${className ? className : ''}`}
      ref={containerRef}
      onClick={trigger === 'click' ? toggleHandler : null}
      onTouchEnd={trigger === 'touch' ? toggleHandler : null}
    >
      {children}
      <div
        className={`
          tooltip_popover
          tooltip_popover__${targetCoords.x > centerCoords.x ? POSITION.LEFT : POSITION.RIGHT}
          tooltip_popover__${targetCoords.y > centerCoords.y ? POSITION.TOP : POSITION.BOTTOM}
          ${show ? 'tooltip_popover__show' : ''}
        `}
        ref={tooltipRef}
      >
        <span className={"tooltip_text"}>
          {title}
        </span>
      </div>
    </div>
  );
}

export { Tooltip };
