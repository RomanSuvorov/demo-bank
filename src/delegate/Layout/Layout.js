import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';

import { Header, Sidebar, Overlay, ModalWrapper } from '../../components';
import { Router } from '../Router';
import AppTypes from '../../store/app/types';
import { getQueryVariable, searchUrlEditor } from '../../sdk/helper';
import './Layout.css';

function Layout() {
  // stores
  const [showContacts, setShowContacts] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { isMobile, modalShow } = useSelector(state => state.app);
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

  const changeWindowSize = () => {
    if (window.innerWidth < 1024 && showSidebar) {
      setShowSidebar(false);
    }
    dispatch({ type: AppTypes.CHANGE_WINDOW_SIZE, payload: window.innerWidth < 1024 });
  }

  useEffect(() => {
    const isContactExist = getQueryVariable('ct');

    if (isContactExist) {
      if (isMobile && showSidebar) setShowSidebar(false);
      setShowContacts(true);
      dispatch({
        type: AppTypes.TOGGLE_MODAL,
        payload: {
          show: true,
          componentPath: 'Contacts/Contacts',
          componentProps: {},
          withOverlay: true,
          closeCallback: handleToggleContacts,
        },
      });
    }
  }, []);

  const handleToggleContacts = () => {
    const isContactExist = getQueryVariable('ct');

    if (!isContactExist && isMobile && showSidebar) setShowSidebar(false);
    setShowContacts(!isContactExist);

    const search = searchUrlEditor(location.search, 'ct', isContactExist ? null : true);
    history.push({
      pathname: location.pathname,
      search: search,
    });

    dispatch({
      type: AppTypes.TOGGLE_MODAL,
      payload: {
        show: !isContactExist,
        componentPath: isContactExist ? null : 'Contacts/Contacts',
        componentProps: {},
        withOverlay: !isContactExist,
        closeCallback: handleToggleContacts
      },
    });
  }

  const handleToggleSidebar = () => {
    const show = !showSidebar;

    if (show && modalShow) {
      const isContactExist = getQueryVariable('ct');

      if (isContactExist) {
        const search = searchUrlEditor(location.search, 'ct', null);
        history.push({
          pathname: location.pathname,
          search: search,
        });
      }

      dispatch({
        type: AppTypes.TOGGLE_MODAL,
        payload: {
          show: false,
          componentPath: null,
          componentProps: {},
          withOverlay: false,
        },
      });
    }
    setShowSidebar(show);
  };

  const handleChangeLang = value => i18n.changeLanguage(value);

  return (
    <div className={"layout"}>
      <Header
        lang={i18n.language}
        showSidebar={showSidebar}
        onChangeSidebar={handleToggleSidebar}
        onChangeLang={handleChangeLang}
      />
      <div className={"layout_container"}>
        <Sidebar
          show={showSidebar}
          showContacts={showContacts}
          isMobile={isMobile}
          onClickContacts={handleToggleContacts}
          onClose={handleToggleSidebar}
        />
        <div className={"layout_wrapper"}>
          <div className={`layout_content${showSidebar ? ' sidebarExpanded' : ''}`}>
            <Router />
          </div>
        </div>
      </div>

      {/* MODALS */}
      <ModalWrapper />

      {/* Overlay is needed for mobile version */}
      <Overlay
        forMobileOnly={true}
        show={showSidebar}
        onClick={handleToggleSidebar}
      />
    </div>
  );
}

export { Layout };
