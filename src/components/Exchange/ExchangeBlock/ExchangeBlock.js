import React from 'react';

import { FirstStep } from '../ExchangeFirstStep/Exchange.FirstStep';
import { SecondStep } from '../ExchangeSecondStep/Exchange.SecondStep';
import { ThirdStep } from '../ExchangeThirdStep/Exchange.ThirdStep';
import { StatusStep } from '../ExchangeStatusStep/Exchange.StatusStep';
import { FinishStep } from '../ExchangeFinishStep/Exchange.FinishStep';
import { Select } from '../..';
import { countryOpts } from '../../../constants';
import './ExchangeBlock.css';

const exchangeState = {
  FIRST_STEP: {
    value: 'FIRST_STEP',
    Component: FirstStep,
  },
  SECOND_STEP: {
    value: 'FIRST_STEP',
    Component: SecondStep,
  },
  THIRD_STEP: {
    value: 'THIRD_STEP',
    Component:ThirdStep,
  },
  STATUS_STEP: {
    value: 'STATUS_STEP',
    Component: StatusStep,
  },
  FINISH_STEP: {
    value: 'FINISH_STEP',
    Component: FinishStep,
  },
};

function ExchangeBlock() {
  const step = exchangeState.FIRST_STEP.value;
  const Component = exchangeState[step].Component;

  const handleChangeCountry = (value) => {
    console.log(value);
  }

  return (
    <div className="exchangeBlock">
      <div className={"exchangeBlock_header"}>
        <Select
          className={"exchangeBlock_header__select"}
          value={"ua"}
          options={countryOpts}
          onChange={handleChangeCountry}
        />
        <div className="exchangeBlock_header__item">
          <div className="exchangeBlock_header__title">
            <span>Покупка</span>
          </div>
          <div className="exchangeBlock_header__value">
            <span>0.1%</span>
          </div>
        </div>
        <div className="exchangeBlock_header__item">
          <div className="exchangeBlock_header__title">
            <span>Продажа</span>
          </div>
          <div className="exchangeBlock_header__value">
            <span>1.1%</span>
          </div>
        </div>
      </div>
      <div className={"exchangeBlock_content"}>
        <Component />
      </div>
    </div>
  );
}

export { ExchangeBlock };
