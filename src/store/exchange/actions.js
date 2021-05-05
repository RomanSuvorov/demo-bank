import Types from './types';
import { exchangeDirection, exchangeStream } from '../../constants';
import { getSelectorsData, validateValue } from '../../sdk/helper';
import sdk from '../../sdk';

// <--- MOCK DATA ---> //
const deliverList = [
  {
    value: 'russian_federation',
    text: 'Российская Федерация',
    cityList: [
      {
        value: 'moscow',
        text: 'Москва',
      },
      {
        value: 'st_petersburg',
        text: 'Санкт-Петербург',
      },
    ],
  },
  {
    value: 'ukraine',
    text: 'Украина',
    cityList: [
      {
        value: 'kyiv',
        text: 'Киев',
      },
      {
        value: 'kharkov',
        text: 'Харков',
      },
    ]
  },
];

// <--- ---> //

async function updatePriceAction(crypto, currency, dispatch, callback) {
  dispatch({ type: Types.LOAD_PRICE_START });
  try {
    const { price } = await sdk.api.getPrice(crypto, currency);
    await dispatch({ type: Types.LOAD_PRICE_SUCCESS, payload: price });
    if (!!callback && typeof callback === 'function') {
      callback();
    }
  } catch (e) {
    console.error(e);
    dispatch({ type: Types.LOAD_DATA_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.LOAD_PRICE_FINISH });
  }
}

export const loadExchangeData = () => async (dispatch, getState) => {
  const store = getState();
  const direction = store.exchange.direction;

  dispatch({ type: Types.LOAD_DATA_START });

  try {
    // countryIndexes
    const { countryIndexes } = await sdk.api.getCountryIndexes();
    dispatch({ type: Types.LOAD_COUNTRIES_INDEXES_SUCCESS, payload: countryIndexes });

    // currencies
    const { currencies } = await sdk.api.getCurrencies();

    const giveList = currencies.filter(item => (direction === exchangeDirection.CRYPTO_SELL) ? item.isCrypto : !item.isCrypto);
    const {
      giveSelected,
      getList,
      getSelected,
      variantList,
      variantSelected,
    } = getSelectorsData(giveList, undefined, 1);

    await updatePriceAction(giveSelected.curr, variantSelected.curr, dispatch);

    let streamExchange;
    if (direction === exchangeDirection.CRYPTO_SELL) {
      streamExchange = getList[0].value === 'cash' ? exchangeStream.SELL_BY_CASH : exchangeStream.SELL_BY_CARD;
    } else if (direction === exchangeDirection.CRYPTO_BUY) {
      streamExchange = giveList[0].value === 'cash' ? exchangeStream.BUY_BY_CASH : exchangeStream.BUY_BY_CARD;
    }

    // TODO: await from server;
    const deliverCountryList = deliverList;

    const localUserData = JSON.parse(localStorage.getItem('second_step'));
    const dataFromLS = {};
      if (localUserData) {
        dataFromLS.forgetInputsValue = localUserData.forgetInputsValue;
        dataFromLS.cardValue = localUserData.cardValue;
        dataFromLS.walletValue = localUserData.walletValue;
        dataFromLS.accountValue = localUserData.accountValue;
        dataFromLS.deliverCountrySelected = localUserData.deliverCountrySelected;
        dataFromLS.deliverCitySelected = localUserData.deliverCitySelected;
        dataFromLS.deliverValue = localUserData.deliverValue;
      }

    const result = {
      streamExchange: streamExchange,
      currencies: currencies,
      giveList: giveList,
      giveSelected: giveSelected,
      getList: getList,
      getSelected: getSelected,
      variantList: variantList,
      variantSelected: variantSelected,
      deliverCountryList: deliverCountryList,
      ...dataFromLS
    };

    dispatch({ type: Types.LOAD_DATA_SUCCESS, payload: result });
  } catch (e) {
    console.error(e);
    dispatch({ type: Types.LOAD_DATA_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.LOAD_DATA_FINISH });
  }
};

export const changeDirection = (direction) => async (dispatch, getState) => {
  const store = getState();
  const currencies = store.exchange.currencies;
  const newDirection = direction === exchangeDirection.CRYPTO_SELL
    ? exchangeDirection.CRYPTO_BUY
    : exchangeDirection.CRYPTO_SELL;

  // first select
  const giveList = currencies.filter(item => (newDirection === exchangeDirection.CRYPTO_SELL) ? item.isCrypto : !item.isCrypto);
  const {
    giveSelected,
    getList,
    getSelected,
    variantList,
    variantSelected,
  } = getSelectorsData(giveList, undefined, 1);


  let streamExchange;
  if (newDirection === exchangeDirection.CRYPTO_SELL) {
    streamExchange = getList[0].value === 'cash' ? exchangeStream.SELL_BY_CASH : exchangeStream.SELL_BY_CARD;
  } else if (newDirection === exchangeDirection.CRYPTO_BUY) {
    streamExchange = giveList[0].value === 'cash' ? exchangeStream.BUY_BY_CASH : exchangeStream.BUY_BY_CARD;
  }

  const payload = {
    direction: newDirection,
    giveList: giveList,
    giveSelected: giveSelected,
    getList: getList,
    getSelected: getSelected,
    variantList: variantList,
    variantSelected: variantSelected,
    streamExchange: streamExchange,
  };

  dispatch({ type: Types.CHANGE_DIRECTION, payload });

  if (newDirection === exchangeDirection.CRYPTO_SELL) {
    await updatePriceAction(giveSelected.curr, variantSelected.curr, dispatch);
  } else {
    await updatePriceAction(getSelected.curr, variantSelected.curr, dispatch);
  }
};

export const changeGiveOption = (value) => async (dispatch, getState) => {
  const store = getState();
  const direction = store.exchange.direction;
  const giveList = store.exchange.giveList;
  const giveAmount = store.exchange.giveAmount;
  const giveError = store.exchange.giveError;

  const {
    giveSelected,
    getList,
    getSelected,
    variantList,
    variantSelected,
  } = getSelectorsData(giveList, value, 1);

  let streamExchange;
  if (direction === exchangeDirection.CRYPTO_SELL) {
    streamExchange = getSelected.value === 'cash' ? exchangeStream.SELL_BY_CASH : exchangeStream.SELL_BY_CARD;
  } else if (direction === exchangeDirection.CRYPTO_BUY) {
    streamExchange = giveSelected.value === 'cash' ? exchangeStream.BUY_BY_CASH : exchangeStream.BUY_BY_CARD;
  }

  const payload = {
    giveSelected: giveSelected,
    getList: getList,
    getSelected: getSelected,
    variantList: variantList,
    variantSelected: variantSelected,
    streamExchange: streamExchange,
  };

  if (variantSelected && giveAmount) {
    const { isValid, errorText } = validateValue({ value: giveAmount, rules: variantSelected.rules });

    if (giveError && isValid) {
      payload.giveError = null;
    } else {
      payload.giveError = errorText;
    }
  }

  dispatch({ type: Types.CHOOSE_GIVE_OPTION, payload });

  await updatePriceAction(
    direction === exchangeDirection.CRYPTO_SELL ? giveSelected.curr : getSelected.curr,
    variantSelected.curr,
    dispatch,
    () => dispatch({ type: Types.CHANGE_GIVE_AMOUNT, payload: giveAmount }),
  );
};

export const changeGetOption = (value) => async (dispatch, getState) => {
  const store = getState();
  const direction = store.exchange.direction;
  const giveSelected = store.exchange.giveSelected;
  const getList = store.exchange.getList;
  const giveAmount = store.exchange.giveAmount;
  const giveError = store.exchange.giveError;

  const {
    getSelected,
    variantList,
    variantSelected,
  } = getSelectorsData(getList, value, 2);

  let streamExchange;
  if (direction === exchangeDirection.CRYPTO_SELL) {
    streamExchange = getSelected.value === 'cash' ? exchangeStream.SELL_BY_CASH : exchangeStream.SELL_BY_CARD;
  } else if (direction === exchangeDirection.CRYPTO_BUY) {
    streamExchange = giveSelected.value === 'cash' ? exchangeStream.BUY_BY_CASH : exchangeStream.BUY_BY_CARD;
  }

  const payload = {
    getSelected: getSelected,
    variantList: variantList,
    variantSelected: variantSelected,
    streamExchange: streamExchange,
  };

  if (variantSelected && giveAmount) {
    const { isValid, errorText } = validateValue({ value: giveError, rules: variantSelected.rules });

    if (giveError && isValid) {
      payload.giveError = null;
    } else {
      payload.giveError = errorText;
    }
  }

  dispatch({ type: Types.CHOOSE_GET_OPTION, payload });

  await updatePriceAction(
    direction === exchangeDirection.CRYPTO_BUY ? getSelected.curr : giveSelected.curr,
    variantSelected.curr,
    dispatch,
    () => dispatch({ type: Types.CHANGE_GIVE_AMOUNT, payload: giveAmount })
  );
};

export const changeVariantOption = (value) => async (dispatch, getState) => {
  const store = getState();
  const direction = store.exchange.direction;
  const giveSelected = store.exchange.giveSelected;
  const getSelected = store.exchange.getSelected;
  const variantList = store.exchange.variantList;
  const giveAmount = store.exchange.giveAmount;
  const giveError = store.exchange.giveError;

  const { variantSelected } = getSelectorsData(variantList, value, 3);

  const payload = {
    variantSelected: variantSelected,
  };

  if (variantSelected && giveAmount) {
    const { isValid, errorText } = validateValue({ value: giveAmount, rules: variantSelected.rules });

    if (giveError && isValid) {
      payload.giveError = null;
    } else {
      payload.giveError = errorText;
    }
  }

  dispatch({ type: Types.CHOOSE_VARIANT_OPTION, payload });

  if (direction === exchangeDirection.CRYPTO_SELL) {
    await updatePriceAction(
      giveSelected.curr,
      variantSelected.curr,
      dispatch,
      () => dispatch({ type: Types.CHANGE_GIVE_AMOUNT, payload: giveAmount }),
    );
  } else {
    await updatePriceAction(
      getSelected.curr,
      variantSelected.curr,
      dispatch,
      () => dispatch({ type: Types.CHANGE_GIVE_AMOUNT, payload: giveAmount }),
    );
  }

};

export const changeCountryPercentAccount = (value) => async (dispatch, getState) => {
  const store = getState();
  const direction = store.exchange.direction;
  const countryList = store.exchange.countryList;
  const giveAmount = store.exchange.giveAmount;
  const getAmount = store.exchange.getAmount;

  const countrySelected = countryList.find(country => country.value === value);
  await dispatch({ type: Types.CHANGE_COUNTRY_PERCENT, payload: countrySelected });

  if (direction === exchangeDirection.CRYPTO_SELL) {
    await dispatch({ type: Types.CHANGE_GIVE_AMOUNT, payload: giveAmount });
  } else {
    await dispatch({ type: Types.CHANGE_GET_AMOUNT, payload: getAmount });
  }
};

export const preventSendingByUser = () => async (dispatch) => {
  // TODO: send to bot that user prevent sending money for system;
};
