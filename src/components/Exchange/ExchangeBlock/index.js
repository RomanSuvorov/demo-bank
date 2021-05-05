import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { FirstStep } from '../ExchangeFirstStep';
import { SecondStep } from '../ExchangeSecondStep';
import { ThirdStep } from '../ExchangeThirdStep';
import { FinishStep } from '../ExchangeFinishStep';
import { Loading }  from '../../Loading';
import { ErrorBlock } from '../../ErrorBlock';
import { Select }  from '../../Select';
import { exchangeDirection, exchangeStepList } from '../../../constants';
import { changeCountryPercentAccount } from '../../../store/exchange/actions';
import './index.css';

export function ExchangeBlock() {
  const error = useSelector(state => state.exchange.error);
  const loading = useSelector(state => state.exchange.loading);
  const direction = useSelector(state => state.exchange.direction);
  const step = useSelector(state => state.exchange.step);
  const countryList = useSelector(state => state.exchange.countryList);
  const countrySelected = useSelector(state => state.exchange.countrySelected);
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

  const handleChangeCountry = value => dispatch(changeCountryPercentAccount(value));

  if (error) {
    return (
      <div className="exchangeBlock">
        <ErrorBlock error={error} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="exchangeBlock">
        <Loading text={"Loading exchange data"} withDots block />
      </div>
    );
  }

  return (
    <div className="exchangeBlock">
      <div className={"exchangeBlock_header"}>
        <Select
          className={"exchangeBlock_header__select"}
          value={countrySelected.value}
          options={countryList}
          onChange={handleChangeCountry}
        />
        <div className={`exchangeBlock_header__item ${direction === exchangeDirection.CRYPTO_BUY ? 'active' : ''}`}>
          <div className="exchangeBlock_header__title">
            <span>{t('header.buy')}</span>
          </div>
          <div className="exchangeBlock_header__value">
            <span hidden={!countrySelected || !countrySelected.buyPercent}>
              {countrySelected ? countrySelected.buyPercent : ''}%
            </span>
          </div>
        </div>
        <div className={`exchangeBlock_header__item ${direction === exchangeDirection.CRYPTO_SELL ? 'active' : ''}`}>
          <div className="exchangeBlock_header__title">
            <span>{t('header.sell')}</span>
          </div>
          <div className="exchangeBlock_header__value">
            <span hidden={!countrySelected || !countrySelected.sellPercent}>
              {countrySelected ? countrySelected.sellPercent : ''}%
            </span>
          </div>
        </div>
      </div>
      <div className={"exchangeBlock_content"}>
        {getStep()}
        <FinishStep />
      </div>
    </div>
  );
}
