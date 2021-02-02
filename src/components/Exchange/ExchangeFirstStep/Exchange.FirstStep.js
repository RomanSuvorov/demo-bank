import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Select } from '../..';
import { Input } from '../..';
import { Button } from '../..';
import { Tooltip } from '../..';
import { HelpSign } from '../..';
import { Loading } from '../..';
import { cnst } from '../../../constants';
import { DirectionIcon } from '../../../constants/icons';
import Types from '../../../store/exchange/types';
import './Exchange.FirstStep.css';

function FirstStep() {
  const {
    loading,
    error,
    direction,
    giveList,
    getList,
    variantList,
    giveSelected,
    giveError,
    getSelected,
    variantSelected,
    giveAmount,
    getAmount,
  } = useSelector(state => state.exchange);
  const { isMobile } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const handleChangeExchangeDirection = () => dispatch({ type: Types.CHANGE_DIRECTION });

  const handleChooseGiveOption = value => dispatch({ type: Types.CHOSE_GIVE_OPTION, payload: value });

  const handleChooseGetOption = value => dispatch({ type: Types.CHOSE_GET_OPTION, payload: value });

  const handleChangeGiveAmount = value => {
    if (Number(value) || value === '') {
      dispatch({ type: Types.CHANGE_GIVE_AMOUNT, payload: value });
    }
  };

  const handleChangeGetAmount = value => {
    if (Number(value) || value === '') {
      dispatch({type: Types.CHANGE_GET_AMOUNT, payload: value});
    }
  };

  const handleChooseFromVariantList = value => dispatch({ type: Types.CHOOSE_VARIANT_OPTION, payload: value })

  const handleSubmit = () => dispatch({ type: Types.NEXT_STEP });

  if (loading) {
    return (
      <div className="firstStep">
        <Loading text={"Loading data..."} />
      </div>
    );
  }

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

      <div className={"firstStep_row select"}>
        <Select
          className={"firstStep_row__left"}
          value={giveSelected.value}
          options={giveList}
          onChange={handleChooseGiveOption}
        />
        <div className={"firstStep_row__center"} />
        <Select
          className={"firstStep_row__right"}
          value={getSelected.value}
          options={getList}
          onChange={handleChooseGetOption}
        />
      </div>

      <div className={"firstStep_row form"}>
        <form className={"firstStep_row__left firstStep_form"}>
          <Input
            className={"firstStep_form__input"}
            type="text"
            value={giveAmount}
            error={giveError}
            placeholder={direction === cnst.CRYPTO_SELL ? '0.00000000' : '0.000'}
            onChange={handleChangeGiveAmount}
          />
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
            value={getAmount}
            placeholder={direction === cnst.CRYPTO_SELL ? '0.000' : '0.00000000'}
            onChange={handleChangeGetAmount}
          />
        </form>
      </div>

      <div className={"firstStep_selectBox"}>
        <Tooltip
          className={"firstStep_selectBox__tooltip"}
          title={"Необходимо ввести ваши контактные данные, а также номер банковской карты, на которую вы хотите" +
          "вывести безналичные средства. После этого вам нужно будет перевести криптовалюту на автоматически" +
          "сгенерированный адрес кошелька DEMO BANK."}
          trigger={isMobile ? 'touch' : 'click'}
        >
          <HelpSign className={"firstStep_selectBox__help"} />
        </Tooltip>
        <Select
          className={"firstStep_selectBox__select"}
          value={variantSelected.value}
          options={variantList}
          onChange={handleChooseFromVariantList}
        />
      </div>

      <div className={"firstStep_buttonBox"}>
        <Button
          className={"firstStep_button"}
          disabled={giveError || error || !giveAmount || !getAmount}
          onClick={handleSubmit}
        >
          Обменять
        </Button>
      </div>
    </div>
  );
}

export { FirstStep };
