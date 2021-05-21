import Types from './types';
import { createReducer, getSelectorsData, validateValue } from '../../sdk/helper'
import { exchangeDirection, exchangeStepList, exchangeStream, transactionProcess } from '../../constants';

const getAmount = (action, percent, fractionDigits) => {
  return (action + ((action * (+percent)) / 100)).toFixed(fractionDigits);
}


const initialStore = {
  countryList: [],
  countrySelected: null,

  // 1st step
  direction: exchangeDirection.CRYPTO_SELL,
  streamExchange: null,
  units: [],
  price: null,
  priceLoading: true,
  giveList: [],
  getList: [],
  variantList: [],
  giveSelected: {},
  getSelected:  {},
  variantSelected: {},
  giveAmount: null,
  giveError: null,
  getAmount: null,

  // 2nd step
  cardValue: null,
  walletValue: null,
  accountValue: null,
  cardError: null,
  walletError: null,
  accountError: null,
  deliverValue: false,
  privacyValue: false,
  forgetInputsValue: true,
  deliverCountryList: [],
  deliverCityList: [],
  deliverCountrySelected: null,
  deliverCitySelected: null,

  // 3rd step
  transactionData: "0000   0000   0000   0000",
  transactionStatus: transactionProcess.PENDING,

  // navigation
  step: exchangeStepList[0].index,
  showFinishStep: false,

  // state of process
  loading: false,
  error: undefined,

  // request
  requestMessage: null,
  requestError: undefined,
  requestLoading: false,
  requestId: null,
};

const reducer = {
  //---------------- LOAD DATA FOR FIRST STEP ------------------//
  [Types.LOAD_DATA_START]: draft => draft.loading = true,

  [Types.LOAD_COUNTRIES_INDEXES_SUCCESS]: (draft, payload) => {
    draft.countryList = payload;
    draft.countrySelected = payload[0];
  },

  [Types.LOAD_DATA_SUCCESS]: (draft, payload) => {
    draft.streamExchange = payload.streamExchange;

    // selectors
    draft.units = payload.units;
    draft.giveList = payload.giveList;
    draft.giveSelected = payload.giveSelected;
    draft.getList = payload.getList;
    draft.getSelected = payload.getSelected;
    draft.variantList = payload.variantList;
    draft.variantSelected = payload.variantSelected;
    draft.error = undefined;

    draft.deliverCountryList = payload.deliverCountryList;
    draft.forgetInputsValue = (payload.hasOwnProperty('forgetInputsValue')) ? payload.forgetInputsValue : draft.forgetInputsValue;
    draft.cardValue = payload.cardValue ? payload.cardValue : draft.cardValue;
    draft.walletValue = payload.walletValue ? payload.walletValue : draft.walletValue;
    draft.accountValue = payload.accountValue ? payload.accountValue : draft.accountValue;
    draft.deliverCountrySelected = payload.deliverCountrySelected ? payload.deliverCountrySelected : draft.deliverCountrySelected;
    if (payload.deliverCountrySelected) {
      draft.deliverCityList = payload.deliverCountrySelected.cityList;
    }
    draft.deliverCitySelected = payload.deliverCitySelected ? payload.deliverCitySelected : draft.deliverCitySelected;
  },

  [Types.LOAD_PRICE_START]: draft => draft.priceLoading = true,

  [Types.LOAD_PRICE_SUCCESS]: (draft, payload) => {
    draft.price = payload;
  },

  [Types.LOAD_PRICE_FINISH]: draft => draft.priceLoading = false,

  [Types.LOAD_DATA_ERROR]: (draft, payload) => draft.error = payload,

  [Types.LOAD_DATA_FINISH]: draft => draft.loading = false,

  [Types.CHANGE_COUNTRY_PERCENT]: (draft, payload) => draft.countrySelected = payload,

  [Types.CHANGE_DIRECTION]: (draft, payload) => {
    draft.direction = payload.direction;
    draft.giveList = payload.giveList;
    draft.giveSelected = payload.giveSelected;
    draft.getList = payload.getList;
    draft.getSelected = payload.getSelected;
    draft.variantList = payload.variantList;
    draft.variantSelected = payload.variantSelected;
    draft.streamExchange = payload.streamExchange;
    draft.giveAmount = null;
    draft.getAmount = null;
    draft.giveError = null;
  },

  [Types.CHOOSE_GIVE_OPTION]: (draft, payload) => {
    draft.giveSelected = payload.giveSelected;
    draft.getList = payload.getList;
    draft.getSelected = payload.getSelected;
    draft.variantList = payload.variantList;
    draft.variantSelected = payload.variantSelected;
    draft.streamExchange = payload.streamExchange;
    draft.giveError = payload.giveError;
  },

  [Types.CHOOSE_GET_OPTION]: (draft, payload) => {
    draft.getSelected = payload.getSelected;
    draft.variantList = payload.variantList;
    draft.variantSelected = payload.variantSelected;
    draft.streamExchange = payload.streamExchange;
    draft.giveError = payload.giveError;
  },

  [Types.CHOOSE_VARIANT_OPTION]: (draft, payload) => {
    draft.variantSelected = payload.variantSelected;
    draft.giveError = payload.giveError;
  },

  [Types.CHANGE_GIVE_AMOUNT]: (draft, payload) => {
    draft.giveAmount = payload;

    if (draft.direction === exchangeDirection.CRYPTO_SELL) {
      draft.getAmount = getAmount((payload * draft.price), draft.countrySelected.sellPercent, 3);
    } else {
      draft.getAmount = getAmount((payload / draft.price), draft.countrySelected.buyPercent, 8);
    }

    const { isValid, errorText } = validateValue({ value: payload, rules: draft.variantSelected.rules });
    draft.giveError = isValid ? null : errorText;
  },

  [Types.CHANGE_GET_AMOUNT]: (draft, payload) => {
    draft.getAmount = payload;

    let giveAmount;
    if (draft.direction === exchangeDirection.CRYPTO_SELL) {
      giveAmount = getAmount((payload / draft.price), draft.countrySelected.sellPercent, 8);
    } else {
      giveAmount = getAmount((payload * draft.price), draft.countrySelected.buyPercent, 3);
    }

    draft.giveAmount = giveAmount;

    const { isValid, errorText } = validateValue({ value: giveAmount, rules: draft.variantSelected.rules });
    draft.giveError = isValid ? null : errorText;
  },

  [Types.CHANGE_CARD_VALUE]: (draft, payload) => draft.cardValue = payload,

  [Types.VALIDATE_CARD_VALUE]: (draft, payload) => draft.cardError = payload,

  [Types.CHANGE_WALLET_VALUE]: (draft, payload) => draft.walletValue = payload,

  [Types.VALIDATE_WALLET_VALUE]: (draft, payload) => draft.walletError = payload,

  [Types.CHANGE_ACCOUNT_VALUE]: (draft, payload) => draft.accountValue = payload,

  [Types.VALIDATE_ACCOUNT_VALUE]: (draft, payload) => draft.accountError = payload,

  [Types.CHANGE_DELIVER_COUNTY_OPTION]: (draft, payload) => {
    const deliverCountrySelected = draft.deliverCountryList.find(country => country.value === payload);
    draft.deliverCountrySelected = deliverCountrySelected;

    draft.deliverCityList = deliverCountrySelected.cityList;
    draft.deliverCitySelected = null;
  },

  [Types.CHANGE_DELIVER_CITY_OPTION]: (draft, payload) => draft.deliverCitySelected = draft.deliverCityList.find(city => city.value === payload),

  [Types.CHANGE_DELIVER_VALUE]: (draft, payload) => draft.deliverValue = payload,

  [Types.CHANGE_PRIVACY_VALUE]: (draft, payload) => draft.privacyValue = payload,

  [Types.CHANGE_REMEMBER_VALUE]: (draft, payload) => {
    draft.forgetInputsValue = payload;
  },

  [Types.CHANGE_TRANSACTION_STATUS]: (draft, payload) => {
    draft.transactionStatus = payload;
  },

  [Types.CREATE_REQUEST_START]: draft => draft.requestLoading = true,

  [Types.CREATE_REQUEST_SUCCESS]: (draft, payload) => {
    draft.requestMessage = payload.message;
    draft.requestId = payload.requestId;
    draft.error = undefined;
  },

  [Types.CREATE_REQUEST_ERROR]: (draft, payload) => {
    draft.requestError = payload;
    draft.requestLoading = false;
  },

  [Types.CREATE_REQUEST_FINISH]: draft => draft.requestLoading = false,

  [Types.NEXT_STEP]: draft => {
    const currentStep = draft.step;

    if (currentStep === 2) {
      draft.requestMessage = null;
      // store user info in browser LS
      let localUserData = JSON.parse(localStorage.getItem('second_step'));
      if (draft.forgetInputsValue && localUserData) {
        if ((draft.streamExchange === exchangeStream.SELL_BY_CASH) || (draft.streamExchange === exchangeStream.BUY_BY_CASH)) {
          delete localUserData.deliverCountrySelected;
          delete localUserData.deliverCitySelected;
          delete localUserData.deliverValue;
        }

        if (draft.direction === exchangeDirection.CRYPTO_SELL) {
          delete localUserData.cardValue;
        } else {
          delete localUserData.walletValue;
        }

        delete localUserData.accountValue;
      } else {
        localUserData = {
          ...localUserData,
          accountValue: draft.accountValue,
        };

        if ((draft.streamExchange === exchangeStream.SELL_BY_CASH) || (draft.streamExchange === exchangeStream.BUY_BY_CASH)) {
          localUserData.deliverCountrySelected = draft.deliverCountrySelected;
          localUserData.deliverCitySelected = draft.deliverCitySelected;
          localUserData.deliverValue = draft.deliverValue;
        }

        if (draft.direction === exchangeDirection.CRYPTO_SELL) {
          localUserData.cardValue = draft.cardValue;
        } else {
          localUserData.walletValue = draft.walletValue;
        }
      }

      localUserData.forgetInputsValue = draft.forgetInputsValue;
      localStorage.setItem('second_step', JSON.stringify(localUserData));
      if (draft.streamExchange === exchangeStream.BUY_BY_CASH) return draft.showFinishStep = true;
    }

    draft.step = currentStep + 1;
  },

  [Types.PREVIOUS_STEP]: draft => {
    const currentStep = draft.step;
    if (currentStep === 1) return;

    if (currentStep === 2) {
      if (draft.forgetInputsValue) {
        draft.cardValue = null;
        draft.accountValue = null;
        draft.accountError = null;
        draft.cardError = null;
        draft.walletValue = null;
        draft.walletError = null;
        draft.deliverCountrySelected = null;
        draft.deliverCityList = [];
        draft.deliverCitySelected = null;
      }
    }

    draft.requestError = undefined;
    draft.error = undefined;
    draft.step = currentStep - 1;
  },

  [Types.RESET_EXCHANGE]: draft => {
    draft.countrySelected = draft.countryList[0];
    draft.direction = initialStore.direction;

    const giveList = draft.units.filter(item => item.isCrypto);
    draft.giveList = giveList;
    const {
      giveSelected,
      getList,
      getSelected,
      variantList,
      variantSelected,
    } = getSelectorsData(giveList, undefined, 1);
    draft.giveSelected = giveSelected;
    draft.getList = getList;
    draft.getSelected = getSelected;
    draft.variantList = variantList;
    draft.variantSelected = variantSelected;
    draft.giveAmount = initialStore.giveAmount;
    draft.giveError = initialStore.giveError;
    draft.getAmount = initialStore.getAmount;
    draft.loading = initialStore.loading;
    draft.error = initialStore.error;
    draft.step = initialStore.step;

    let streamExchange;
    if (initialStore.direction === exchangeDirection.CRYPTO_SELL) {
      streamExchange = getList[0].value === 'cash' ? exchangeStream.SELL_BY_CASH : exchangeStream.SELL_BY_CARD;
    } else if (initialStore.direction === exchangeDirection.CRYPTO_BUY) {
      streamExchange = giveList[0].value === 'cash' ? exchangeStream.BUY_BY_CASH : exchangeStream.BUY_BY_CARD;
    }
    draft.streamExchange = streamExchange;

    draft.transactionStatus = initialStore.transactionStatus;
    draft.privacyValue = initialStore.privacyValue;
    draft.showFinishStep = initialStore.showFinishStep;

    const localUserData = JSON.parse(localStorage.getItem('second_step'));
    if (localUserData) {
      draft.forgetInputsValue = localUserData.forgetInputsValue;
      draft.cardValue = localUserData.cardValue;
      draft.walletValue = localUserData.walletValue;
      draft.accountValue = localUserData.accountValue;
      draft.deliverCountrySelected = localUserData.deliverCountrySelected;
      draft.deliverCitySelected = localUserData.deliverCitySelected;
      draft.deliverValue = localUserData.deliverValue;
    } else {
      draft.forgetInputsValue = initialStore.forgetInputsValue;
      draft.cardValue = initialStore.cardValue;
      draft.walletValue = initialStore.walletValue;
      draft.accountValue = initialStore.accountValue;
      draft.deliverCountrySelected = initialStore.deliverCountrySelected;
      draft.deliverCitySelected = initialStore.deliverCitySelected;
      draft.deliverValue = initialStore.deliverValue;
    }
  },

  [Types.FINISH_STEP]: (draft, payload) => {
    draft.showFinishStep = payload;
  },

  [Types.UPDATE_COUNTRY_INDEXES]: (draft, payload) => {
    const { country } = payload;

    const countryIndexInCurrentArray = draft.countryList.findIndex(item => item._id === country._id);
    if (countryIndexInCurrentArray !== -1) {
      draft.countryList = [
        ...draft.countryList.slice(0, countryIndexInCurrentArray),
        country,
        ...draft.countryList.slice(countryIndexInCurrentArray + 1),
      ];

      if (draft.countrySelected._id === country._id) {
        draft.countrySelected = country;
      }
    } else {
      draft.countryList = [...draft.countryList, country];
    }
  },

  [Types.UPDATE_COUNTRIES_INDEXES]: (draft, payload) => {
    const { countries } = payload;
    draft.countryList = countries;

    const prevSelectedId = draft.countrySelected._id;
    draft.countrySelected = countries.find(item => item._id === prevSelectedId);
  },
};

export default createReducer(reducer, initialStore);

