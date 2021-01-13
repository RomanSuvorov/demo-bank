import React from 'react';
import PropTypes from 'prop-types';

import { sidebarOpts } from '../../constants';
import { CloseIcon } from '../../constants/icons';
import './Sidebar.css';

function Sidebar({ show, onClose }) {
  const activeItem = 'exchange';

  const handleRouteTo = (e) => {
    const { dataset } = e.target;

    if (dataset && !dataset.linkto) {
      console.log('linkTo', dataset.linkto);
    }
  };

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
            sidebarOpts.map(({ key, value, text, Icon }) => (
              <div
                className={`sidebar_list__item ${activeItem === value ? 'active' : ''}`}
                data-linkto={value}
                key={key}
                onClick={handleRouteTo}
              >
                <Icon className={"sidebar_list__icon"}/>
                <span className={"sidebar_list__text"}>{text}</span>
              </div>
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

Sidebar.defaultProps = {
  show: false,
  onClose: () => {},
};

export { Sidebar };
