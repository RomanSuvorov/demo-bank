import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ExpandIcon } from '../../assets/icons';
import AppTypes from '../../store/app/types';
import { loadPinData } from '../../store/app/actions';
import './index.css';

export function Map() {
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();

  const handleOpenModal = async (value = true) => {
    if (value) {
      dispatch(loadPinData());
    }

    dispatch({
      type: AppTypes.TOGGLE_MODAL,
      payload: {
        show: value,
        componentPath: value ? 'GoogleMap' : null,
        componentProps: {},
        withOverlay: value,
        closeCallback: () => handleOpenModal(false),
      }
    });
  };

  return (
    <div className={"map"}
      onClick={handleOpenModal}
    >
      <div className={"map_header"}>
        <div className={"map_header__title"}>
          <span>{t('exchange.map.title')}</span>
        </div>
        <div className={"map_header__expand"}>
          <ExpandIcon />
        </div>
      </div>
      <div className={"map_content"} />
    </div>
  );
}
