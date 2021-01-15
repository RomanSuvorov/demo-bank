import React, { useState } from 'react';

import { Header, Sidebar, Overlay } from '../../components';
import { Router } from '../Router';
import './Layout.css';

function Layout() {
  const [showSide, toggleShowSide] = useState(true);

  const handleChangeLang = (value) => {
    console.log(value);
  };

  const handleChangeSidebar = () => {
    toggleShowSide(!showSide);
  };

  return (
    <div className={"layout"}>
      <Header
        showSidebar={showSide}
        onChangeSidebar={handleChangeSidebar}
        onChangeLang={handleChangeLang}
      />
      <div className={"layout_container"}>
        <Sidebar show={showSide} onClose={handleChangeSidebar} />
        <div className={"layout_wrapper"}>
          <div className={`layout_content${showSide ? ' sidebarExpanded' : ''}`}>
            <Router />
          </div>
        </div>
      </div>

      {/* Overlay is needed for mobile version */}
      <Overlay
        forMobileOnly={true}
        show={showSide}
        onClick={handleChangeSidebar}
      />
    </div>
  );
}

export { Layout };
