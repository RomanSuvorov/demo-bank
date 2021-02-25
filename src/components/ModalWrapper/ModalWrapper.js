import React, { Fragment, useState, useEffect, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Overlay } from '..';
import { Loading } from '..';
import './ModalWrapper.css';

function ModalWrapper() {
  const {
    modalShow,
    modalComponentPath,
    modalComponentProps,
    modalClassName,
    modalWithOverlay,
    closeCallback,
  } = useSelector(state => state.app);
  const [show, setShow] = useState(modalShow);

  useEffect(() => {
    if (modalShow) setShow(true);
  }, [modalShow])

  let CustomComponent;
  if (modalComponentPath) {
    CustomComponent = lazy(() => import(`../${modalComponentPath}`));
  }

  const handleCloseModal = () => {
    setShow(false);

    setTimeout(() => {
      closeCallback();
    }, 500);
  };

  const Wrapper = modalWithOverlay ? Overlay : Fragment;
  const wrapperProps = modalWithOverlay ? { show: show, onClick: handleCloseModal } : {};

  return (
    <Wrapper {...wrapperProps}>
      <Suspense fallback={<Loading />}>
        <div className={`modalWrapper ${modalClassName} ${show ? 'visible' : ''}`} onClick={handleCloseModal}>
            {modalComponentPath && <CustomComponent {...modalComponentProps} />}
        </div>
      </Suspense>
    </Wrapper>
  );
}

export { ModalWrapper };
