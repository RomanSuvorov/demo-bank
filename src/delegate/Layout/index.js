import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Overlay } from '../../components/Overlay';
import { Modal } from '../../components/ModalWrapper';
import Router from '../Router';
import AppTypes from '../../store/app/types';
import { getQueryVariable, searchUrlEditor, throttle } from '../../sdk/helper';
import './index.css';

export function Layout() {
  // stores
  const [showContacts, setShowContacts] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // useEffect doesn't see change of showSidebar boolean value
  // for this showSideRef was created
  const showSideRef = useRef(false);
  const { isDesktop, modalShow } = useSelector(state => state.app);
  const dispatch = useDispatch();

  // routing
  const location = useLocation();
  const history = useHistory();

  // localization
  const { i18n } = useTranslation();

  useEffect(() => {
    changeWindowSize();

    const throttledChangeWindowSize = throttle(changeWindowSize, 100);
    window.addEventListener("resize", throttledChangeWindowSize);
    return () => window.removeEventListener("resize", throttledChangeWindowSize);
  }, []);

  const changeWindowSize = () => {
    if (window.innerWidth < 1024 && showSideRef.current) {
      setShowSidebar(false);
      showSideRef.current = false;
    }
    dispatch({ type: AppTypes.CHANGE_WINDOW_SIZE, payload: window.innerWidth });
  }

  useEffect(() => {
    const isContactExist = getQueryVariable('ct');

    if (isContactExist) {
      if (!isDesktop && showSidebar) {
        setShowSidebar(false);
        showSideRef.current = false;
      }
      setShowContacts(true);
      dispatch({
        type: AppTypes.TOGGLE_MODAL,
        payload: {
          show: true,
          componentPath: 'Contacts',
          componentProps: {},
          withOverlay: true,
          closeCallback: handleToggleContacts,
        },
      });
    }
  }, []);

  const handleToggleContacts = () => {
    const isContactExist = getQueryVariable('ct');

    if (!isContactExist && !isDesktop && showSidebar) {
      setShowSidebar(false);
      showSideRef.current = false;
    }
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
        componentPath: isContactExist ? null : 'Contacts',
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
    showSideRef.current = show;
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
          isDesktop={isDesktop}
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
      <Modal />

      {/* Overlay is needed for mobile version */}
      <Overlay
        forMobileOnly={true}
        show={showSidebar}
        onClick={handleToggleSidebar}
      />
    </div>
  );
}
