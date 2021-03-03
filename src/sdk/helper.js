import { useState, useEffect, useRef } from 'react';
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
      case 'maxLength':
        isValid = (String(value).length <= rule.value);
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
      case 'isEmail':
        const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        isValid = !!(value.match(emailReg));
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

export function getDate({
  time = 0,
  divider = { timeDivider: ":", dateDivider: "." },
  withTime = false,
}) {
  if (!time) return 'Нету данных';

  const dateInMS = new Date(time);

  const hh = String(dateInMS.getUTCHours()).padStart(2, '0');
  const mm = String(dateInMS.getUTCMinutes()).padStart(2, '0');


  const YYYY = dateInMS.getUTCFullYear();
  const MM = String(dateInMS.getUTCMonth() + 1).padStart(2, '0'); // month of the year
  const DD = String(dateInMS.getUTCDate()).padStart(2, '0'); // day of the month

  if (withTime) {
    return {
      data:`${DD}${divider.dateDivider}${MM}${divider.dateDivider}${YYYY}`,
      time: `${hh}${divider.timeDivider}${mm}`,
    };
  }

  return `${DD}${divider.dateDivider}${MM}${divider.dateDivider}${YYYY}`;
}

export function useForm({ initialValues = {}, validate = {}, onSubmit }) {
  const [formFields, setFormFields] = useState(initialValues);
  let [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        onSubmit(formFields);
        setFormFields(initialValues);
        setIsSubmitting(false);
      }
    }, [errors, isSubmitting]);

  const createChangeHandler = (key) => (value) =>
    setFormFields(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const [key, value] of Object.entries(formFields)) {
      const { isValid, errorText } = validateValue({ value, rules: validate[key] });

      setErrors(prevState => {
        if (isValid) {
          if (prevState.hasOwnProperty(key)) {
            const newState = { ...prevState };
            delete newState[key];
            return newState;
          }
          return prevState;
        } else {
          return { ...prevState, [key]: errorText };
        }
      });
    }

    setIsSubmitting(true);
  }

  return { formFields, createChangeHandler, handleSubmit, errors };
}

export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);

  return isMounted;
}

export function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);
    isThrottled = true;
    setTimeout(function() {
      isThrottled = false;

      if(savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = undefined;
        savedThis = undefined;
      }
    }, ms);
  }

  return wrapper;
}
