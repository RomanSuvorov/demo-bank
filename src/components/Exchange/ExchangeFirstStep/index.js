import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Select }  from '../../Select';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { Tooltip } from '../../Tooltip';
import { HelpSign } from '../../HelpSign';
import { exchangeDirection } from '../../../constants';
import { DirectionIcon } from '../../../assets/icons';
import {
  changeGiveOption,
  changeDirection,
  changeGetOption,
  changeVariantOption,
} from '../../../store/exchange/actions';
import { numberWithCommas, removeFormatting } from '../../../sdk/helper';
import Types from '../../../store/exchange/types';
import './index.css';

export function FirstStep() {
  const direction = useSelector(state => state.exchange.direction);
  const variantList = useSelector(state => state.exchange.variantList);
  const giveList = useSelector(state => state.exchange.giveList);
  const getList = useSelector(state => state.exchange.getList);
  const giveSelected = useSelector(state => state.exchange.giveSelected);
  const giveError = useSelector(state => state.exchange.giveError);
  const getSelected = useSelector(state => state.exchange.getSelected);
  const variantSelected = useSelector(state => state.exchange.variantSelected);
  const giveAmount = useSelector(state => state.exchange.giveAmount);
  const getAmount = useSelector(state => state.exchange.getAmount);
  const priceLoading = useSelector(state => state.exchange.priceLoading);
  const dispatch = useDispatch();
  const { t } = useTranslation('exchange');

  const handleChangeExchangeDirection = () => {
    if (priceLoading) return;
    dispatch(changeDirection(direction));
  };

  const handleChooseGiveOption = value => dispatch(changeGiveOption(value));

  const handleChooseGetOption = value => dispatch(changeGetOption(value));

  const handleChangeGiveAmount = value => dispatch({ type: Types.CHANGE_GIVE_AMOUNT, payload: removeFormatting(value) });

  const handleChangeGetAmount = value => dispatch({ type: Types.CHANGE_GET_AMOUNT, payload: removeFormatting(value) });

  const handleChooseFromVariantList = value => dispatch(changeVariantOption(value));

  const handleSubmit = () => dispatch({ type: Types.NEXT_STEP });

  return (
    <div className="firstStep">
      <div className={"firstStep_row title"}>
        <div className={"firstStep_row__left"}>
          <span>{t('firstStep.give')}</span>
        </div>
        <div className={"firstStep_row__center"} />
        <div className={"firstStep_row__right"}>
          <span>{t('firstStep.get')}</span>
        </div>
      </div>

      <div className={"firstStep_row select"}>
        <Select
          className={"firstStep_row__left"}
          value={giveSelected.value}
          disable={priceLoading}
          options={giveList}
          onChange={handleChooseGiveOption}
        />
        <div className={"firstStep_row__center"} />
        <Select
          className={"firstStep_row__right"}
          value={getSelected.value}
          disable={priceLoading}
          options={getList}
          onChange={handleChooseGetOption}
        />
      </div>

      <div className={"firstStep_row form"}>
        <form
          className={"firstStep_row__left firstStep_form"}
          onSubmit={e => e.preventDefault()}
        >
          <Input
            className={"firstStep_form__input"}
            value={numberWithCommas(giveAmount)}
            min={0}
            loading={priceLoading}
            error={giveError}
            placeholder={direction === exchangeDirection.CRYPTO_SELL ? '0.00000000' : '0.000'}
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
            value={numberWithCommas(getAmount)}
            min={0}
            loading={priceLoading}
            placeholder={direction === exchangeDirection.CRYPTO_SELL ? '0.000' : '0.00000000'}
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
        >
          <HelpSign className={"firstStep_selectBox__help"} />
        </Tooltip>
        <Select
          className={"firstStep_selectBox__select"}
          value={variantSelected.value}
          options={variantList}
          disable={priceLoading}
          onChange={handleChooseFromVariantList}
        />
      </div>

      <div className={"firstStep_buttonBox"}>
        <Button
          className={"firstStep_button"}
          disabled={giveError || !giveAmount || !getAmount}
          onClick={handleSubmit}
        >
          {t('firstStep.exchange')}
        </Button>
      </div>
    </div>
  );
}
