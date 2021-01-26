import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Header, Sidebar, Overlay } from '../../components';
import { Router } from '../Router';
import Types from '../../store/app/types';
import './Layout.css';

function Layout() {
  const { showSidebar, lang } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const handleChangeSidebar = () => dispatch({ type: Types.TOGGLE_SIDEBAR });

  const handleChangeLang = value => dispatch({ type: Types.CHANGE_LANGUAGE, payload: value });

  return (
    <div className={"layout"}>
      <Header
        lang={lang}
        showSidebar={showSidebar}
        onChangeSidebar={handleChangeSidebar}
        onChangeLang={handleChangeLang}
      />
      <div className={"layout_container"}>
        <Sidebar
          show={showSidebar}
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
