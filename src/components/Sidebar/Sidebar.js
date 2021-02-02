import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import { sidebarOpts } from '../../constants';
import { CloseIcon } from '../../constants/icons';
import './Sidebar.css';

function Sidebar({ show, isMobile, onClose }) {
  const location = useLocation();

  return (
    <div className={`sidebar${show ? ' expanded' : ' collapsed'}`}>

      {/* For mobile */}
      <div className={"sidebar_header"}>
        <div className={"sidebar_header__closeIcon"} onClick={onClose}>
          <CloseIcon />
        </div>
      </div>

      <div className={"sidebar_container"}>
        <div className={"sidebar_list"}>
          {
            sidebarOpts.map(({ key, path, text, Icon }) => (
              <Link
                className={`sidebar_list__item ${location.pathname.match(path) ? 'active' : ''}`}
                key={key}
                to={path}
                onClick={isMobile ? onClose : () => {}}
              >
                <Icon className={"sidebar_list__icon"}/>
                <span className={"sidebar_list__text"}>{text}</span>
              </Link>
            ))
          }
        </div>
        <div className={"sidebar_review"}>
          <span className={"sidebar_review__text"}>Отзывы на</span>
          &nbsp;
          <a
            className={"sidebar_review__link"}
            href="https://www.bestchange.ru"
            target={"_blank"}
          >
            BestChange
          </a>
        </div>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export { Sidebar };
