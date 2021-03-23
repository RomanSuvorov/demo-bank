import React, { Fragment, useState, useEffect, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

import { Overlay } from '../Overlay';
import { Loading }  from '../Loading';
import './index.css';

export function Modal() {
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
    setShow(modalShow);
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
      <Suspense fallback={<Loading text={'Load modal'} withDots />}>
        <div
          className={`modalWrapper ${modalClassName} ${show ? 'visible' : ''}`}
          onClick={e => e.stopPropagation()}
        >
            {modalComponentPath && <CustomComponent {...modalComponentProps} />}
        </div>
      </Suspense>
    </Wrapper>
  );
}
