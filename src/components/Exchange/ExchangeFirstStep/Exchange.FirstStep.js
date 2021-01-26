import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Select } from '../..';
import { Input } from '../..';
import { DirectionIcon } from '../../../constants/icons';
import { SelectorsRow } from './SelectorRows';
import Types from '../../../store/exchange/types';
import './Exchange.FirstStep.css';

function FirstStep() {
  const { direction, giveSelected, getSelected, cryptoList, methodList } = useSelector(state => state.exchange);
  const dispatch = useDispatch();
  const errors = [{ text: 'Error during validation process' }];

  const handleChangeExchangeDirection = () => dispatch({ type: Types.CHANGE_DIRECTION });

  const handleChooseGiveOption = value => dispatch({ type: Types.CHOSE_GIVE_OPTION, payload: value });

  const handleChooseGetOption = value => dispatch({ type: Types.CHOSE_GET_OPTION, payload: value });

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

      <SelectorsRow
        direction={direction}
        giveSelected={giveSelected}
        getSelected={getSelected}
        methodList={methodList}
        cryptoList={cryptoList}
        chooseGiveOption={handleChooseGiveOption}
        chooseGetOption={handleChooseGetOption}
      />

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
          <div
            className="firstStep_direction__icon"
            onClick={handleChangeExchangeDirection}
          >
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
