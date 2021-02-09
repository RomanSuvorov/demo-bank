import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FirstStep } from '../ExchangeFirstStep/Exchange.FirstStep';
import { SecondStep } from '../ExchangeSecondStep/Exchange.SecondStep';
import { ThirdStep } from '../ExchangeThirdStep/Exchange.ThirdStep';
import { FinishStep } from '../ExchangeFinishStep/Exchange.FinishStep';
import { Select } from '../..';
import { exchangeDirection, exchangeStepList } from '../../../constants';
import Types from '../../../store/exchange/types';
import './ExchangeBlock.css';

function ExchangeBlock() {
  const {
    direction,
    step,
    countryList,
    countrySelected,
    buyPercent,
    sellPercent,
  } = useSelector(state => state.exchange);
  const dispatch = useDispatch();

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
            <span>Покупка</span>
          </div>
          <div className="exchangeBlock_header__value">
            <span>{buyPercent}%</span>
          </div>
        </div>
        <div className={`exchangeBlock_header__item ${direction === exchangeDirection.CRYPTO_SELL ? 'active' : ''}`}>
          <div className="exchangeBlock_header__title">
            <span>Продажа</span>
          </div>
          <div className="exchangeBlock_header__value">
            <span>{sellPercent}%</span>
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

export { ExchangeBlock };
