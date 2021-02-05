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
