import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';

import { Header, Sidebar, Overlay, Contacts } from '../../components';
import { Router } from '../Router';
import Types from '../../store/app/types';
import { getQueryVariable, searchUrlEditor } from '../../sdk/helper';
import './Layout.css';

function Layout() {
  // stores
  const [showContacts, changeShowContacts] = useState(false);
  const { showSidebar, isMobile } = useSelector(state => state.app);
  const dispatch = useDispatch();

  // routing
  const location = useLocation();
  const history = useHistory();

  // localization
  const { i18n } = useTranslation();

  useEffect(() => {
    changeWindowSize();

    window.addEventListener("resize", changeWindowSize);
    return () => window.removeEventListener("resize", changeWindowSize);
  }, []);

  useEffect(() => {
    const contacts = getQueryVariable('ct');
    if (showContacts !== contacts) changeShowContacts(!!contacts);
  }, [location])

  const changeWindowSize = () => dispatch({ type: Types.CHANGE_WINDOW_SIZE, payload: window.innerWidth < 1024 });

  const handleChangeSidebar = () => {
    if (!showSidebar && showContacts) {
      handleToggleContacts();
    }
    dispatch({ type: Types.TOGGLE_SIDEBAR });
  }

  const handleChangeLang = value => i18n.changeLanguage(value);

  const handleToggleContacts = () => {
    const search = searchUrlEditor(location.search, 'ct', showContacts ? null : true);

    history.push({
      pathname: location.pathname,
      search: search,
    });

    if (!showContacts && isMobile) {
      handleChangeSidebar();
    }
  };

  return (
    <div className={"layout"}>
      <Header
        lang={i18n.language}
        showSidebar={showSidebar}
        onChangeSidebar={handleChangeSidebar}
        onChangeLang={handleChangeLang}
      />
      <div className={"layout_container"}>
        <Sidebar
          show={showSidebar}
          showContacts={showContacts}
          isMobile={isMobile}
          onClickContacts={handleToggleContacts}
          onClose={handleChangeSidebar}
        />
        <div className={"layout_wrapper"}>
          <div className={`layout_content${showSidebar ? ' sidebarExpanded' : ''}`}>
            <Router />
          </div>
        </div>
      </div>

      {/* <<--- MODALS --->> */}
      {/* Overlay is needed for mobile version */}
      <Overlay
        forMobileOnly={true}
        show={showSidebar}
        onClick={handleChangeSidebar}
      />

      {/* Contact Modal */}
      <Overlay
        forMobileOnly={false}
        show={showContacts}
        onClick={handleToggleContacts}
      >
        <Contacts />
      </Overlay>
    </div>
  );
}

export { Layout };
