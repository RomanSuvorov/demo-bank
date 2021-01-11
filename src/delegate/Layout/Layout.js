import React, { useState } from 'react';

import { Header, Sidebar } from '../../components';
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
        <Sidebar show={showSide} />
        <div className={"layout_wrapper"}>
          <div className={`layout_content${showSide ? ' sidebarExpanded' : ''}`}>
          {/* Router */}
          vsfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          sfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          sfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          sfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          sfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          sfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          sfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          sfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          sfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          sfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          sfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          sfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          sfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          sfd dfdsf fdsfs fd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          1232323
          f fdsfs fd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf s
          1232323s fd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdss fd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdss fd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfdsf fdsfs fdsf ssfd dfds

          </div>
        </div>
      </div>
    </div>
  );
}

export { Layout };
