import React from 'react';

import { Select } from '../..';
import { Input } from '../..';
import { DirectionIcon } from '../../../constants/icons';
import { SelectorsRow } from './SelectorRows';
import './Exchange.FirstStep.css';

function FirstStep() {
  const errors = [{ text: 'Error during validation process' }];

  return (
    <div className="firstStep">
      <div className={"firstStep_row title"}>
        <div className={"firstStep_row__left"}>
          <span>Отдаете</span>
        </div>
        <div className={"firstStep_row__center"} />
        <div className={"firstStep_row__right"}>
          <span>Получаете</span>
        </div>
      </div>

      <SelectorsRow />

      <div className={"firstStep_row form"}>
        <form className={"firstStep_row__left firstStep_form"}>
          <Input
            className={"firstStep_form__input"}
            type="text"
            value={"UAH"}
            onChange={() => {}}
          />
          {
            (errors.length > 0 && errors[0].text) &&
            <div className={"firstStep_form__error"}>{errors[0].text}</div>
          }
        </form>
        <div className={"firstStep_row__center"}>
          <div className="firstStep_direction__icon">
            <DirectionIcon />
          </div>
        </div>
        <form className={"firstStep_row__left firstStep_form"}>
          <Input
            className={"firstStep_form__input"}
            type="text"
            value={"BTC"}
            onChange={() => {}}
          />
          {
            (errors.length > 0 && errors[0].text) &&
            <div className={"firstStep_form__error"}>{errors[0].text}</div>
          }
        </form>
      </div>

      <div className={"firstStep_selectBox"}>
        <div className={"firstStep_selectBox__tooltip"}>?</div>
        <Select className={"firstStep_selectBox__select"} />
      </div>

      <button className={"firstStep_button"}>Обменять</button>
    </div>
  );
}

export { FirstStep };
