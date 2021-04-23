import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './index.css';

export function HowToBuy() {
  const { t } = useTranslation('translation');
  const step = useSelector(state => state.exchange.step);
  const showFinishStep = useSelector(state => state.exchange.showFinishStep);

  return (
    <div className={"howToBuy"}>
      <div className={"howToBuy_title"}>
        <span>{t('exchange.howToBuy.title')}</span>
      </div>

      <div className={"howToBuy_schema"}>
        <div className={"howToBuy_schema__item"}>
          <div className={"howToBuy_schema__top"}>
            <div className={`howToBuy_schema__number${step === 1 ? ' active' : ''}`}>
              <span>1</span>
            </div>
          </div>
          <div className={"howToBuy_schema__bottom"}>
            <span>{t('exchange.howToBuy.first')}</span>
          </div>
        </div>
        <div className={"howToBuy_schema__item"}>
          <div className={"howToBuy_schema__top"}>
            <div className={`howToBuy_schema__number${step === 2 ? ' active' : ''}`}>
              <span>2</span>
            </div>
          </div>
          <div className={"howToBuy_schema__bottom"}>
            <span>{t('exchange.howToBuy.second')}</span>
          </div>
        </div>
        <div className={"howToBuy_schema__item"}>
          <div className={"howToBuy_schema__top"}>
            <div className={`howToBuy_schema__number${step === 3 ? ' active' : ''}`}>
              <span>3</span>
            </div>
          </div>
          <div className={"howToBuy_schema__bottom"}>
            <span>{t('exchange.howToBuy.third')}</span>
          </div>
        </div>
        <div className={"howToBuy_schema__item"}>
          <div className={"howToBuy_schema__top"}>
            <div className={`howToBuy_schema__number${showFinishStep ? ' active' : ''}`}>
              <span>4</span>
            </div>
          </div>
          <div className={"howToBuy_schema__bottom"}>
            <span>{t('exchange.howToBuy.fourth')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
