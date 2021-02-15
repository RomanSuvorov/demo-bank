import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Header, Sidebar, Overlay } from '../../components';
import { Router } from '../Router';
import Types from '../../store/app/types';
import './Layout.css';

function Layout() {
  const { showSidebar, isMobile } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    changeWindowSize();

    window.addEventListener("resize", changeWindowSize);
    return () => window.removeEventListener("resize", changeWindowSize);
  }, []);

  const changeWindowSize = () => dispatch({ type: Types.CHANGE_WINDOW_SIZE, payload: window.innerWidth < 1024 });

  const handleChangeSidebar = () => dispatch({ type: Types.TOGGLE_SIDEBAR });

  const handleChangeLang = value => i18n.changeLanguage(value);

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
          isMobile={isMobile}
          onClose={handleChangeSidebar}
        />
        <div className={"layout_wrapper"}>
          <div className={`layout_content${showSidebar ? ' sidebarExpanded' : ''}`}>
            <Router />
          </div>
        </div>
      </div>

      {/* Overlay is needed for mobile version */}
      <Overlay
        forMobileOnly={true}
        show={showSidebar}
        onClick={handleChangeSidebar}
      />
    </div>
  );
}

export { Layout };
