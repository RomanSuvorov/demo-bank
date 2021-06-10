import Types from './types';
import { exchangeDirection, exchangeStream, transactionProcess } from '../../constants';
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

export const validateSecondStep = (streamExchange, direction, accountValue, cardValue, walletValue) => {
  return async (dispatch) => {
    const { isValid: isAccountValid, errorText: accountErrorText } = validateValue({
      value: accountValue,
      rules: [
        {
          name: 'required',
          text: 'Field is required',
        },
        {
          name: 'isPhoneOrAccount',
          text: 'Incorrect phone number or account',
        },
      ],
    });

    const cardRules = [
      {
        name: 'required',
        text: 'Field is required',
      },
      {
        name: 'isCard',
        text: `Incorrect card number`
      },
    ];
    const walletRules = [
      {
        name: 'required',
        text: 'Field is required',
      },
      {
        name: 'isWallet',
        text: `Incorrect wallet address`
      },
    ]

    let inputValidate = {};

    if (streamExchange !== exchangeStream.SELL_BY_CASH) {
      inputValidate = validateValue({
        value: direction === exchangeDirection.CRYPTO_SELL ? cardValue : walletValue,
        rules: direction === exchangeDirection.CRYPTO_SELL ? cardRules : walletRules,
      });
    } else {
      inputValidate.isValid = true;
      inputValidate.errorText = null;
    }

    if (isAccountValid && inputValidate.isValid) {
      dispatch({ type: Types.VALIDATE_ACCOUNT_VALUE, payload: null });

      if (direction === exchangeDirection.CRYPTO_SELL) {
        dispatch({ type: Types.VALIDATE_CARD_VALUE, payload: null });

      } else {
        dispatch({ type: Types.VALIDATE_WALLET_VALUE, payload: null });

      }
    } else {
      if (!isAccountValid) {
        dispatch({ type: Types.VALIDATE_ACCOUNT_VALUE, payload: accountErrorText });
      }

      if (inputValidate.errorText) {
        if (direction === exchangeDirection.CRYPTO_SELL) {
          dispatch({ type: Types.VALIDATE_CARD_VALUE, payload: inputValidate.errorText });
        } else {
          dispatch({ type: Types.VALIDATE_WALLET_VALUE, payload: inputValidate.errorText });
        }
      }
    }

    return !!(isAccountValid && inputValidate.isValid);
  };
};

export const loadExchangeData = () => async (dispatch, getState) => {
  const store = getState();
  const direction = store.exchange.direction;

  dispatch({ type: Types.LOAD_DATA_START });

  try {
    // countryIndexes
    const { countryIndexes } = await sdk.api.getCountryIndexes();

    if (!countryIndexes || !Array.isArray(countryIndexes) || !countryIndexes.length) {
      throw new SyntaxError("Index of countries weren't loaded");
    }

    dispatch({ type: Types.LOAD_COUNTRIES_INDEXES_SUCCESS, payload: countryIndexes });

    // units
    const { sellUnits } = await sdk.api.getSellUnits();

    const giveList = sellUnits;
    const giveSelected = getSelectorsData({ list: sellUnits });
    const getList = giveSelected.methods;
    const getSelected = getSelectorsData({ list: getList });
    const variantList = getSelected.variants;
    const variantSelected = getSelectorsData({ list: variantList });

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

export const changeDirection = (direction) => async (dispatch) => {
  const newDirection = direction === exchangeDirection.CRYPTO_SELL
    ? exchangeDirection.CRYPTO_BUY
    : exchangeDirection.CRYPTO_SELL;
  let data;

  if (newDirection === exchangeDirection.CRYPTO_BUY) {
    data = await sdk.api.getBuyUnits();
  } else {
    data = await sdk.api.getSellUnits();
  }

  const giveList = (newDirection === exchangeDirection.CRYPTO_BUY) ? data.buyUnits : data.sellUnits;
  const giveSelected = getSelectorsData({ list: giveList });
  const getList = (newDirection === exchangeDirection.CRYPTO_BUY) ? giveSelected.units : giveSelected.methods;
  const getSelected = getSelectorsData({ list: getList });
  const variantList = getSelected.variants;
  const variantSelected = getSelectorsData({ list: variantList });

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

  const giveSelected = getSelectorsData({ list: giveList, value: value });
  const getList = (direction === exchangeDirection.CRYPTO_BUY) ? giveSelected.units : giveSelected.methods;
  const getSelected = getSelectorsData({ list: getList });
  const variantList = getSelected.variants;
  const variantSelected = getSelectorsData({ list: variantList });

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

  const getSelected = getSelectorsData({ list: getList, value: value });
  const variantList = getSelected.variants;
  const variantSelected = getSelectorsData({ list: variantList });

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

  const variantSelected = getSelectorsData({ list: variantList, value: value });

  const payload = { variantSelected: variantSelected };

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

export const createExchangeRequest = (language) => async (dispatch, getState) => {
  const store = getState();
  const streamExchange = store.exchange.streamExchange;
  const giveSelected = store.exchange.giveSelected;
  const getSelected = store.exchange.getSelected;
  const variantSelected = store.exchange.variantSelected;
  const giveAmount = store.exchange.giveAmount;
  const getAmount = store.exchange.getAmount;
  const accountValue = store.exchange.accountValue;
  const deliverCountrySelected = store.exchange.deliverCountrySelected;
  const deliverCitySelected = store.exchange.deliverCitySelected;
  const deliverValue = store.exchange.deliverValue;
  const cardValue = store.exchange.cardValue;
  const walletValue = store.exchange.walletValue;

  try {
    dispatch({ type: Types.CREATE_REQUEST_START });

    let request = {
      stream: streamExchange,
      giveValue: giveSelected.value,
      giveText: giveSelected.translation[language],
      giveAmount: giveAmount,
      getValue: getSelected.value,
      getText: getSelected.translation[language],
      getAmount: getAmount,
      variantText: variantSelected.translation[language],
      variantCurr: variantSelected.curr,
      accountValue: accountValue,
    };

    if (streamExchange === exchangeStream.SELL_BY_CASH) {
      request = {
        ...request,
        country: deliverCountrySelected.text,
        city: deliverCitySelected.text,
        delivery: deliverValue,
      };
    } else if (streamExchange === exchangeStream.SELL_BY_CARD) {
      request = {
        ...request,
        card: cardValue,
      };
    } else if (streamExchange === exchangeStream.BUY_BY_CASH) {
      request = {
        ...request,
        country: deliverCountrySelected.text,
        city: deliverCitySelected.text,
        delivery: deliverValue,
        wallet: walletValue,
      };
    } else if (streamExchange === exchangeStream.BUY_BY_CARD) {
      request = {
        ...request,
        wallet: walletValue,
      };
    } else {
      return null;
    }

    const { message, requestId } = await sdk.api.createExchangeRequest(request);

    dispatch({ type: Types.CREATE_REQUEST_SUCCESS, payload: { message, requestId } });

    setTimeout(() => {
      dispatch({ type: Types.NEXT_STEP });
    }, 5000);
  } catch (e) {
    dispatch({ type: Types.CREATE_REQUEST_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.CREATE_REQUEST_FINISH });
  }
}

export const cancelRequest = (requestId) => async (dispatch) => {
  try {
    dispatch({ type: Types.CHANGE_TRANSACTION_STATUS, payload: transactionProcess.PENDING });

    await sdk.api.cancelRequest(requestId);

    dispatch({ type: Types.PREVIOUS_STEP });
  } catch (e) {
    dispatch({ type: Types.RESET_EXCHANGE });
  }
};
