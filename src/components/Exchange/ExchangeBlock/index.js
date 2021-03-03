import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { FirstStep } from '../ExchangeFirstStep';
import { SecondStep } from '../ExchangeSecondStep';
import { ThirdStep } from '../ExchangeThirdStep';
import { FinishStep } from '../ExchangeFinishStep';
import { Loading }  from '../../Loading';
import { Select }  from '../../Select';
import { exchangeDirection, exchangeStepList } from '../../../constants';
import Types from '../../../store/exchange/types';
import './index.css';

export function ExchangeBlock() {
  const {
    error,
    loading,
    direction,
    step,
    countryList,
    countrySelected,
    buyPercent,
    sellPercent,
  } = useSelector(state => state.exchange);
  const dispatch = useDispatch();
  const { t } = useTranslation('exchange');

  const getStep = () => {
    const componentData = exchangeStepList.find(item => item.index === step);

    if (componentData) {
      let Component;

      switch (componentData.Component) {
        case 'FirstStep':
          Component = FirstStep;
          break;
        case 'SecondStep':
          Component = SecondStep;
          break;
        case 'ThirdStep':
          Component = ThirdStep;
          break;
        default:
          Component = FirstStep;
          break;
      }

      return <Component />;
    } else {
      return <div />;
    }
  };

  const handleChangeCountry = value => dispatch({ type: Types.CHANGE_COUNTRY_PERCENT, payload: value });

  return (
    <div className="exchangeBlock">
      <div className={"exchangeBlock_header"}>
        <Select
          className={"exchangeBlock_header__select"}
          value={countrySelected}
          options={countryList}
          onChange={handleChangeCountry}
        />
        <div className={`exchangeBlock_header__item ${direction === exchangeDirection.CRYPTO_BUY ? 'active' : ''}`}>
          <div className="exchangeBlock_header__title">
            <span>{t('header.buy')}</span>
          </div>
          <div className="exchangeBlock_header__value">
            <span>{buyPercent}%</span>
          </div>
        </div>
        <div className={`exchangeBlock_header__item ${direction === exchangeDirection.CRYPTO_SELL ? 'active' : ''}`}>
          <div className="exchangeBlock_header__title">
            <span>{t('header.sell')}</span>
          </div>
          <div className="exchangeBlock_header__value">
            <span>{sellPercent}%</span>
          </div>
        </div>
      </div>
      <div className={"exchangeBlock_content"}>
        {loading ? <Loading text={"Loading data..."} /> : getStep()}
        <FinishStep />
      </div>
    </div>
  );
}
