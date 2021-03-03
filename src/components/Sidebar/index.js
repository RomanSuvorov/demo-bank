import React  from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import { sidebarOpts, routes } from '../../constants';
import { CloseIcon } from '../../assets/icons';
import './index.css';

export function Sidebar({ show, showContacts, isDesktop, onClickContacts, onClose }) {
  const { isExact } = useRouteMatch();
  const { pathname } = useLocation();

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
            sidebarOpts.map(({ key, path, text, Icon }) => {
              let isActive = false;

              if (!showContacts) {
                isActive = pathname === path;
                if (isExact && key === routes.EXCHANGE.key) isActive = true;
              } else if (showContacts && key === routes.CONTACTS.key) {
                isActive = true;
              }


              if (key === routes.CONTACTS.key) {
                return (
                  <div
                    className={`sidebar_list__item ${isActive ? 'active' : ''}`}
                    key={key}
                    onClick={onClickContacts}
                  >
                    <Icon className={"sidebar_list__icon"}/>
                    <span className={"sidebar_list__text"}>{text}</span>
                  </div>
                )
              }

              return (
                <Link
                  className={`sidebar_list__item ${isActive ? 'active' : ''}`}
                  key={key}
                  to={path}
                  onClick={isDesktop ? () => {} : onClose}
                >
                  <Icon className={"sidebar_list__icon"}/>
                  <span className={"sidebar_list__text"}>{text}</span>
                </Link>
              )
            })
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
