import React from 'react';
import PropTypes from 'prop-types';

import {
  BurgerMenuIcon,
  Logo,
  FacebookIcon,
  ViberIcon,
  TelegramIcon,
} from '../../constants/icons';
import { Select } from '../Select/Select';
import { languageOpts } from '../../constants';
import './Header.css';

function Header({
  showSidebar,
  onChangeSidebar,
  onChangeLang,
}) {
  return (
    <div className={"header"}>
      <div className={`header_menu${showSidebar ? "" : " active"}`} onClick={onChangeSidebar}>
        <BurgerMenuIcon />
      </div>
      <div className={"header_logoBox"}>
        <div className={"header_logoBox__logo"}>
          <Logo />
        </div>
        <div className={"header_logoBox__slogan"}>
          <span>Decentralization&nbsp;</span>
          <span>money BANK</span>
        </div>
      </div>
      <div className={"header_contacts"}>
        <div className={"header_contacts__item"}>
          <FacebookIcon />
        </div>
        <div className={"header_contacts__item"}>
          <ViberIcon />
        </div>
        <div className={"header_contacts__item"}>
          <TelegramIcon />
        </div>
      </div>
      <Select
        className={"header_language"}
        value={"rus"}
        options={languageOpts}
        onChange={onChangeLang}
      />
    </div>
  );
}

Header.propTypes = {
  onChangeSidebar: PropTypes.func,
  onChangeLang: PropTypes.func,
};

Header.defaultProps = {
  onChangeSidebar: () => {},
  onChangeLang: () => {},
};

export { Header };
