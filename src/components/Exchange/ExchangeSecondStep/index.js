import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '../../Tooltip'
import { HelpSign } from '../../HelpSign';
import { Select }  from '../../Select';
import { Input } from '../../Input';
import { Checkbox } from '../../Checkbox';
import { Button } from '../../Button';
import { Loading } from '../../Loading';
import { ErrorBlock } from '../../ErrorBlock';
import ExchangeTypes from '../../../store/exchange/types';
import AppTypes from '../../../store/app/types';
import { createExchangeRequest, validateSecondStep } from '../../../store/exchange/actions';
import { exchangeDirection, exchangeStream } from '../../../constants';
import './index.css';

export function SecondStep() {
  const streamExchange = useSelector(state => state.exchange.streamExchange);
  const direction = useSelector(state => state.exchange.direction);
  const variantList = useSelector(state => state.exchange.variantList);
  const variantSelected = useSelector(state => state.exchange.variantSelected);
  const cardValue = useSelector(state => state.exchange.cardValue);
  const walletValue = useSelector(state => state.exchange.walletValue);
  const accountValue = useSelector(state => state.exchange.accountValue);
  const cardError = useSelector(state => state.exchange.cardError);
  const walletError = useSelector(state => state.exchange.walletError);
  const accountError = useSelector(state => state.exchange.accountError);
  const deliverCountryList = useSelector(state => state.exchange.deliverCountryList);
  const deliverCityList = useSelector(state => state.exchange.deliverCityList);
  const deliverCountrySelected = useSelector(state => state.exchange.deliverCountrySelected);
  const deliverCitySelected = useSelector(state => state.exchange.deliverCitySelected);
  const deliverValue = useSelector(state => state.exchange.deliverValue);
  const privacyValue = useSelector(state => state.exchange.privacyValue);
  const forgetInputsValue = useSelector(state => state.exchange.forgetInputsValue);
  const requestLoading = useSelector(state => state.exchange.requestLoading);
  const requestError = useSelector(state => state.exchange.requestError);
  const requestMessage = useSelector(state => state.exchange.requestMessage);
  const isCardMode = !!((streamExchange === exchangeStream.SELL_BY_CARD) || (streamExchange === exchangeStream.BUY_BY_CARD));
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation('exchange');
  let sendDisable;

  if (streamExchange === exchangeStream.SELL_BY_CARD) {
    sendDisable = !cardValue || !accountValue || !privacyValue;
  } else if (streamExchange === exchangeStream.SELL_BY_CASH) {
    sendDisable = !deliverCountrySelected || !deliverCitySelected || !accountValue || !privacyValue;
  } else if (streamExchange === exchangeStream.BUY_BY_CARD) {
    sendDisable = !walletValue || !accountValue || !privacyValue;
  } else if (streamExchange === exchangeStream.BUY_BY_CASH) {
    sendDisable = !walletValue || !deliverCountrySelected || !deliverCitySelected || !accountValue || !privacyValue;
  }

  const handleChooseFromVariantList = value => dispatch({ type: ExchangeTypes.CHOOSE_VARIANT_OPTION, payload: value });

  const handleChangeCardValue = value => dispatch({ type: ExchangeTypes.CHANGE_CARD_VALUE, payload: value });

  const handleChangeWalletValue = value => dispatch({ type: ExchangeTypes.CHANGE_WALLET_VALUE, payload: value });

  const handleChangeAccountValue = value => dispatch({type: ExchangeTypes.CHANGE_ACCOUNT_VALUE, payload: value });

  const handleChooseFromDeliverCountryList = value => dispatch({ type: ExchangeTypes.CHANGE_DELIVER_COUNTY_OPTION, payload: value });

  const handleChooseFromDeliverCityList = value => dispatch({ type: ExchangeTypes.CHANGE_DELIVER_CITY_OPTION, payload: value });

  const handleChangeDeliver = value => dispatch({ type: ExchangeTypes.CHANGE_DELIVER_VALUE, payload: value });

  const handleChangePrivacy = value => dispatch({ type: ExchangeTypes.CHANGE_PRIVACY_VALUE, payload: value });

  const handleTogglePrivacyModal = (e) => {
    e.preventDefault();
    dispatch({ type: AppTypes.TOGGLE_PRIVACY_MODAL });
  }

  const handleChangeRemember = value => dispatch({ type: ExchangeTypes.CHANGE_REMEMBER_VALUE, payload: value });

  const handleGoBack = () => dispatch({ type: ExchangeTypes.PREVIOUS_STEP });

  const handleSend = async () => {
    const isStepValid = await dispatch(validateSecondStep(
      streamExchange,
      direction,
      accountValue,
      cardValue,
      walletValue,
    ));

    if (isStepValid) {
      await dispatch(createExchangeRequest(i18n.language));
    }
  }

  const getInputs = () => {
    if (direction === exchangeDirection.CRYPTO_BUY) {
      return (
        <Input
          className={"secondStep_input"}
          label={<span>Адрес кошелька</span>}
          name={"wallet"}
          type={"text"}
          value={walletValue}
          min={0}
          error={walletError}
          placeholder={"36CBFBE9E63178BA0360B9B8AD986A70"}
          onChange={handleChangeWalletValue}
        />
      );
    }

    if (direction === exchangeDirection.CRYPTO_SELL) {
      if (isCardMode) {
        return (
          <Input
            className={"secondStep_input"}
            label={<span>Номер банковской карты</span>}
            name={"card"}
            type={"number"}
            value={cardValue}
            min={0}
            error={cardError}
            placeholder={"0000 0000 0000 0000"}
            onChange={handleChangeCardValue}
          />
        );
      }
    }
  }

  if (requestError || requestLoading || requestMessage) {
    return (
      <div className={"secondStep"}>
        {
          requestMessage && (
            <div className={"secondStep_requestSuccess"}>
              <span>Поздравляем! Заявка успешно создана!</span>
            </div>
          )
        }

        <div className={"secondStep_loadingBox"}>
          {
            requestError ? (
              <ErrorBlock error={requestError} />
            ) : (
              <Loading text={requestLoading ? "Sending request" : "Prepare finish step"} withDots />
            )
          }
        </div>

        {
          !requestMessage && (
            <div className={"secondStep_buttonBox"}>
              <Button
                className={"secondStep_button"}
                disabled={requestLoading}
                onClick={handleGoBack}
              >
                Назад
              </Button>
              <Button
                className={"secondStep_button"}
                disabled={true}
                onClick={handleSend}
              >
                Отправить
              </Button>
            </div>
          )
        }
      </div>
    );
  }

  return (
    <div className={"secondStep"}>
      <div className={"secondStep_title"}>
        <span>Введите Ваши данные</span>
        <Tooltip
          className={"secondStep_tooltip"}
          title={"Необходимо ввести ваши контактные данные, а также номер банковской карты, на которую вы" +
          "хотите вывести безналичные средства. После этого вам нужно будет перевести криптовалюту на автоматически" +
          "сгенерированный адрес кошелька DEMO BANK."}
        >
          <HelpSign className={"secondStep__help"} />
        </Tooltip>
      </div>

      {
        isCardMode && (
          <Select
            className={"secondStep_select"}
            value={variantSelected.value}
            options={variantList}
            onChange={handleChooseFromVariantList}
          />
        )
      }

      {getInputs()}

      <Input
        className={"secondStep_input"}
        label={<span>Номер телефона или Telegram аккаунт</span>}
        name={"account"}
        type={"text"}
        value={accountValue}
        error={accountError}
        placeholder={"+38 093 433 86 95"}
        onChange={handleChangeAccountValue}
      />

      {
        !isCardMode && (
          <>
            <div className={"secondStep_selectors"}>
              <Select
                className={"secondStep_select county"}
                value={deliverCountrySelected ? deliverCountrySelected.value : undefined}
                placeholder={"Выберите страну"}
                options={deliverCountryList}
                onChange={handleChooseFromDeliverCountryList}
              />
              <Select
                className={"secondStep_select city"}
                value={deliverCitySelected ? deliverCitySelected.value : undefined}
                placeholder={"Выберите город"}
                options={deliverCityList}
                disable={deliverCityList.length < 1}
                onChange={handleChooseFromDeliverCityList}
              />
            </div>

            <Checkbox
              className={"secondStep_checkbox"}
              label={(<span>Курьер</span>)}
              name={"deliver"}
              value={deliverValue}
              onChange={handleChangeDeliver}
            />
          </>
        )
      }
      <Checkbox
        className={"secondStep_checkbox"}
        label={(
          <div>
            <span>С&nbsp;</span>
            <span className={"secondStep_checkbox__toggle"} onClick={handleTogglePrivacyModal}>правилами сервиса</span>
            <span>&nbsp;ознакомлен и согласен</span>
          </div>
        )}
        name={"privacy"}
        value={privacyValue}
        onChange={handleChangePrivacy}
      />
      <Checkbox
        className={"secondStep_checkbox"}
        label={(<span>Не запоминать введенные данные</span>)}
        name={"remember"}
        value={forgetInputsValue}
        onChange={handleChangeRemember}
      />
      <div className={"secondStep_buttonBox"}>
        <Button
          className={"secondStep_button"}
          onClick={handleGoBack}
        >
          Назад
        </Button>
        <Button
          className={"secondStep_button"}
          disabled={sendDisable}
          onClick={handleSend}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
}
