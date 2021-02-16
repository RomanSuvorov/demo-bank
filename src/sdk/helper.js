import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import produce from 'immer';

export const createReduxStore = _configureStore;

export const createReducer = (cases = {}, defaultState = {}) =>
  (state = defaultState, action) => produce(state, draft => {
    if (action && action.type && cases[action.type] instanceof Function) {
      cases[action.type](draft, action.payload);
    }
  });

const _loadState = () => {
  try {
    const serializedState = localStorage.getItem('dmb_store');
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const _saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('dmb_store', serializedState);
  } catch (e) {

  }
};

function _configureStore(reducers) {
  const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

  return createStore(
    combineReducers({ ...reducers }),
    // _loadState(),
    undefined,
    composeEnhancers(applyMiddleware(ReduxPromise, thunk, createLogger)),
  );
}

export function getSelectorsData(data, payload, selectorsLvl) {
  const getFirstLvl = (array, value) => {
    let giveSelected;

    if (!value) {
      giveSelected = array[0];
    } else {
      giveSelected = array.find(item => item.value === value);
    }

    const getList = giveSelected.method;
    const { getSelected, variantList, variantSelected } = getSecondLvl(giveSelected.method)

    return { giveSelected, getList, getSelected, variantList, variantSelected };
  };

  const getSecondLvl = (array, value) => {
    let getSelected;

    if (!value) {
      getSelected = array[0];
    } else {
      getSelected = array.find(item => item.value === value);
    }

    const variantList = getSelected.variants;
    const { variantSelected } = getThirdLvl(getSelected.variants)

    return { getSelected, variantList, variantSelected };
  };

  const getThirdLvl = (array, value) => {
    let variantSelected;

    if (!value) {
      variantSelected = array[0];
    } else {
      variantSelected = array.find(item => item.value === value);
    }

    return { variantSelected };
  };

  if (selectorsLvl === 1) {
    return getFirstLvl(data, payload);
  } else if (selectorsLvl === 2) {
    return getSecondLvl(data, payload);
  } else if (selectorsLvl === 3) {
    return getThirdLvl(data, payload);
  }

}

export function validateValue({ value, rules, address }) {
  let isValid = false, errorText = null;
  if (!rules || (rules && !rules.length)) return { isValid: true, errorText };

  rules.some(rule => {
    switch (rule.name) {
      case 'required':
        isValid = !!(value);
        break;
      case 'minNumber':
        isValid = (value >= rule.value);
        break;
      case 'maxNumber':
        isValid = (value <= rule.value);
        break;
      case 'isCard':
        const americanExpressReg = /^(?:3[47][0-9]{13})$/;
        const visaReg = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        const masterCardReg = /^(?:5[1-5][0-9]{14})$/;
        const discoverReg = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
        isValid = !!(value.match(americanExpressReg) || value.match(visaReg) || value.match(masterCardReg) || value.match(discoverReg));
        break;
      case 'isWallet':
        // let walletReg;
        // switch (address) {
        //   case 'btc':
        //     walletReg = /^&/;
        //     break;
        //   case 'bch':
        //     walletReg = /^&/;
        //     break;
        //   case 'xrp':
        //     walletReg = /^&/;
        //     break;
        //   case 'ltc':
        //     walletReg = /^&/;
        //     break;
        //   case 'usdt':
        //     walletReg = /^&/;
        //     break;
        //   case 'usdt_trc20':
        //     walletReg = /^&/;
        //     break;
        //   case 'usdt_erc20':
        //     walletReg = /^&/;
        //     break;
        //   case 'eth':
        //     walletReg = /^&/;
        //     break;
        // }
        //
        // isValid = !!(value.match(walletReg));
        isValid = true;
        break;
      case 'isPhoneOrAccount':
        const phoneReg = /^\+?(\d{10,})$/;
        const accountReg = /^@(\w{5,32})$/;
        isValid = !!(value.match(phoneReg) || value.match(accountReg));
        break;
    }

    if (!isValid) {
      errorText = rule.text;
    }

    return !isValid;
  });

  return { isValid, errorText };
}

export function getQueryVariable(variable) {
  const query = window.location.search.substring(1);

  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', variable);
}

export function searchUrlEditor(search, key, value) {
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = search.indexOf('?') !== -1 ? "&" : "?";

  if (!value) {
    let searchUrl = search.replace(new RegExp("([?&]?)" + key + "=[^&]*", "i"), '');
    if (searchUrl.indexOf('?') === -1) searchUrl = searchUrl.replace(/&/, '?');
    return searchUrl;
  } else if (search.match(re)) {
    return search.replace(re, '$1' + key + "=" + value + '$2');
  } else {
    return search + separator + key + "=" + value;
  }
}
