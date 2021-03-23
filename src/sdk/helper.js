import { useState, useEffect, useRef } from 'react';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import produce from 'immer';
import { createChart } from 'lightweight-charts';

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

export function initChart({ containerNode, chartOptions, areaOptions, dataset, withTooltip = false, tooltipStoreHandler = () => {}, storeChart }) {
  if (storeChart) {
    storeChart.remove();
  }

  const chart = createChart(containerNode, chartOptions);
  const series = chart.addAreaSeries(areaOptions);
  setChartSeriesData({ chart, series, dataset })

  if (withTooltip) chart.subscribeCrosshairMove((e) => tooltipHandler(e, series, containerNode, tooltipStoreHandler));

  return { chart, series };
}

export function setChartSeriesData({ chart, series, dataset }) {
  if (!chart || !series) return;

  series.setData([
    { time: "2018-03-29", value: 154.2 },
    { time: "2018-03-30", value: 155.60001 },
    { time: "2018-04-02", value: 156.25 },
    { time: "2018-04-03", value: 156.25 },
    { time: "2018-04-04", value: 156.05 },
    { time: "2018-04-05", value: 158.05 },
    { time: "2018-04-06", value: 157.3 },
    { time: "2018-04-09", value: 144 },
    { time: "2018-04-10", value: 144.8 },
    { time: "2018-04-11", value: 143.5 },
    { time: "2018-04-12", value: 147.05 },
    { time: "2018-04-13", value: 144.85001 },
    { time: "2018-04-16", value: 145.39999 },
    { time: "2018-04-17", value: 147.3 },
    { time: "2018-04-18", value: 153.55 },
    { time: "2018-04-19", value: 150.95 },
    { time: "2018-04-20", value: 149.39999 },
    { time: "2018-04-23", value: 148.5 },
    { time: "2018-04-24", value: 146.60001 },
    { time: "2018-04-25", value: 144.45 },
    { time: "2018-04-26", value: 145.60001 },
    { time: "2018-04-27", value: 144.3 },
    { time: "2018-04-30", value: 144 },
    { time: "2018-05-02", value: 147.3 },
    { time: "2018-05-03", value: 144.2 },
    { time: "2018-05-04", value: 141.64999 },
    { time: "2018-05-07", value: 141.89999 },
    { time: "2018-05-08", value: 140.39999 },
    { time: "2018-05-10", value: 139.8 },
    { time: "2018-05-11", value: 137.5 },
    { time: "2018-05-14", value: 136.14999 },
    { time: "2018-05-15", value: 138 },
    { time: "2018-05-16", value: 137.95 },
    { time: "2018-05-17", value: 137.95 },
    { time: "2018-05-18", value: 136.75 },
    { time: "2018-05-21", value: 136.2 },
    { time: "2018-05-22", value: 135 },
    { time: "2018-05-23", value: 132.55 },
    { time: "2018-05-24", value: 132.7 },
    { time: "2018-05-25", value: 132.2 },
    { time: "2018-05-28", value: 131.55 },
    { time: "2018-05-29", value: 131.85001 },
    { time: "2018-05-30", value: 139.85001 },
    { time: "2018-05-31", value: 140.8 },
    { time: "2018-06-01", value: 139.64999 },
    { time: "2018-06-04", value: 137.10001 },
    { time: "2018-06-05", value: 139.25 },
    { time: "2018-06-06", value: 141.3 },
    { time: "2018-06-07", value: 145 },
    { time: "2018-06-08", value: 143.89999 },
    { time: "2018-06-11", value: 142.7 },
    { time: "2018-06-13", value: 144.05 },
    { time: "2018-06-14", value: 143.55 },
    { time: "2018-06-15", value: 140.5 },
    { time: "2018-06-18", value: 139.64999 },
    { time: "2018-06-19", value: 138 },
    { time: "2018-06-20", value: 141 },
    { time: "2018-06-21", value: 140.55 },
    { time: "2018-06-22", value: 140.55 },
    { time: "2018-06-25", value: 140.75 },
    { time: "2018-06-26", value: 140.64999 },
    { time: "2018-06-27", value: 141.14999 },
    { time: "2018-06-28", value: 139.8 },
    { time: "2018-06-29", value: 139.8 },
    { time: "2018-07-02", value: 140.14999 },
    { time: "2018-07-03", value: 143.05 },
    { time: "2018-07-04", value: 140 },
    { time: "2018-07-05", value: 129.2 },
    { time: "2018-07-06", value: 129.55 },
    { time: "2018-07-09", value: 128.3 },
    { time: "2018-07-10", value: 126.55 },
    { time: "2018-07-11", value: 124.3 },
    { time: "2018-07-12", value: 124.8 },
    { time: "2018-07-13", value: 123.25 },
    { time: "2018-07-16", value: 123 },
    { time: "2018-07-17", value: 124.25 },
    { time: "2018-07-18", value: 123 },
    { time: "2018-07-19", value: 121 },
    { time: "2018-07-20", value: 121.45 },
    { time: "2018-07-23", value: 123.8 },
    { time: "2018-07-24", value: 122.15 },
    { time: "2018-07-25", value: 121.3 },
    { time: "2018-07-26", value: 122.7 },
    { time: "2018-07-27", value: 122.2 },
    { time: "2018-07-30", value: 121.7 },
    { time: "2018-07-31", value: 122.95 },
    { time: "2018-08-01", value: 121 },
    { time: "2018-08-02", value: 116 },
    { time: "2018-08-03", value: 118.1 },
    { time: "2018-08-06", value: 114.3 },
    { time: "2018-08-07", value: 114.25 },
    { time: "2018-08-08", value: 111.85 },
    { time: "2018-08-09", value: 109.7 },
    { time: "2018-08-10", value: 105 },
    { time: "2018-08-13", value: 105.75 },
    { time: "2018-08-14", value: 107.25 },
    { time: "2018-08-15", value: 107.4 },
    { time: "2018-08-16", value: 110.5 },
    { time: "2018-08-17", value: 109 },
    { time: "2018-08-20", value: 108.95 },
    { time: "2018-08-21", value: 108.35 },
    { time: "2018-08-22", value: 108.6 },
    { time: "2018-08-23", value: 105.65 },
    { time: "2018-08-24", value: 104.45 },
    { time: "2018-08-27", value: 106.2 },
    { time: "2018-08-28", value: 106.55 },
    { time: "2018-08-29", value: 111.8 },
    { time: "2018-08-30", value: 115.5 },
    { time: "2018-08-31", value: 115.5 },
    { time: "2018-09-03", value: 114.55 },
    { time: "2018-09-04", value: 112.75 },
    { time: "2018-09-05", value: 111.5 },
    { time: "2018-09-06", value: 108.1 },
    { time: "2018-09-07", value: 108.55 },
    { time: "2018-09-10", value: 106.5 },
    { time: "2018-09-11", value: 105.1 },
    { time: "2018-09-12", value: 107.2 },
    { time: "2018-09-13", value: 107.1 },
    { time: "2018-09-14", value: 105.75 },
    { time: "2018-09-17", value: 106.05 },
    { time: "2018-09-18", value: 109.15 },
    { time: "2018-09-19", value: 111.4 },
    { time: "2018-09-20", value: 111 },
    { time: "2018-09-21", value: 111 },
    { time: "2018-09-24", value: 108.95 },
    { time: "2018-09-25", value: 106.65 },
    { time: "2018-09-26", value: 106.7 },
    { time: "2018-09-27", value: 107.05 },
    { time: "2018-09-28", value: 106.55 },
    { time: "2018-10-01", value: 106.2 },
    { time: "2018-10-02", value: 106.4 },
    { time: "2018-10-03", value: 107.1 },
    { time: "2018-10-04", value: 106.4 },
    { time: "2018-10-05", value: 104.65 },
    { time: "2018-10-08", value: 102.65 },
    { time: "2018-10-09", value: 102.1 },
    { time: "2018-10-10", value: 102.15 },
    { time: "2018-10-11", value: 100.9 },
    { time: "2018-10-12", value: 102 },
    { time: "2018-10-15", value: 100.15 },
    { time: "2018-10-16", value: 99 },
    { time: "2018-10-17", value: 98 },
    { time: "2018-10-18", value: 96 },
    { time: "2018-10-19", value: 95.5 },
    { time: "2018-10-22", value: 92.400002 },
    { time: "2018-10-23", value: 92.300003 },
    { time: "2018-10-24", value: 92.900002 },
    { time: "2018-10-25", value: 91.849998 },
    { time: "2018-10-26", value: 91.599998 },
    { time: "2018-10-29", value: 94.050003 },
    { time: "2018-10-30", value: 98.25 },
    { time: "2018-10-31", value: 97.25 },
    { time: "2018-11-01", value: 96.879997 },
    { time: "2018-11-02", value: 101.78 },
    { time: "2018-11-06", value: 102.4 },
    { time: "2018-11-07", value: 100.6 },
    { time: "2018-11-08", value: 98.5 },
    { time: "2018-11-09", value: 95.139999 },
    { time: "2018-11-12", value: 96.900002 },
    { time: "2018-11-13", value: 97.400002 },
    { time: "2018-11-14", value: 103.3 },
    { time: "2018-11-15", value: 102.74 },
    { time: "2018-11-16", value: 101.2 },
    { time: "2018-11-19", value: 98.720001 },
    { time: "2018-11-20", value: 102.2 },
    { time: "2018-11-21", value: 108.8 },
    { time: "2018-11-22", value: 109.9 },
    { time: "2018-11-23", value: 113.74 },
    { time: "2018-11-26", value: 110.9 },
    { time: "2018-11-27", value: 113.28 },
    { time: "2018-11-28", value: 113.6 },
    { time: "2018-11-29", value: 113.14 },
    { time: "2018-11-30", value: 114.4 },
    { time: "2018-12-03", value: 111.84 },
    { time: "2018-12-04", value: 106.7 },
    { time: "2018-12-05", value: 107.8 },
    { time: "2018-12-06", value: 106.44 },
    { time: "2018-12-07", value: 103.7 },
    { time: "2018-12-10", value: 101.02 },
    { time: "2018-12-11", value: 102.72 },
    { time: "2018-12-12", value: 101.8 },
    { time: "2018-12-13", value: 102 },
    { time: "2018-12-14", value: 102.1 },
    { time: "2018-12-17", value: 101.04 },
    { time: "2018-12-18", value: 101.6 },
    { time: "2018-12-19", value: 102 },
    { time: "2018-12-20", value: 102.02 },
    { time: "2018-12-21", value: 102.2 },
    { time: "2018-12-24", value: 102.1 },
    { time: "2018-12-25", value: 100.8 },
    { time: "2018-12-26", value: 101.02 },
    { time: "2018-12-27", value: 100.5 },
    { time: "2018-12-28", value: 101 },
    { time: "2019-01-03", value: 101.5 },
    { time: "2019-01-04", value: 101.1 },
    { time: "2019-01-08", value: 101.1 },
    { time: "2019-01-09", value: 102.06 },
    { time: "2019-01-10", value: 105.14 },
    { time: "2019-01-11", value: 104.66 },
    { time: "2019-01-14", value: 106.22 },
    { time: "2019-01-15", value: 106.98 },
    { time: "2019-01-16", value: 108.4 },
    { time: "2019-01-17", value: 109.06 },
    { time: "2019-01-18", value: 107 },
    { time: "2019-01-21", value: 105.8 },
    { time: "2019-01-22", value: 105.24 },
    { time: "2019-01-23", value: 105.4 },
    { time: "2019-01-24", value: 105.38 },
    { time: "2019-01-25", value: 105.7 },
    { time: "2019-01-28", value: 105.8 },
    { time: "2019-01-29", value: 106.1 },
    { time: "2019-01-30", value: 108.6 },
    { time: "2019-01-31", value: 107.92 },
    { time: "2019-02-01", value: 105.22 },
    { time: "2019-02-04", value: 102.44 },
    { time: "2019-02-05", value: 102.26 },
    { time: "2019-02-06", value: 102 },
    { time: "2019-02-07", value: 101.62 },
    { time: "2019-02-08", value: 101.9 },
    { time: "2019-02-11", value: 101.78 },
    { time: "2019-02-12", value: 102.7 },
    { time: "2019-02-13", value: 100.14 },
    { time: "2019-02-14", value: 101.36 },
    { time: "2019-02-15", value: 101.62 },
    { time: "2019-02-18", value: 100.74 },
    { time: "2019-02-19", value: 100 },
    { time: "2019-02-20", value: 100.04 },
    { time: "2019-02-21", value: 100 },
    { time: "2019-02-22", value: 100.12 },
    { time: "2019-02-25", value: 100.04 },
    { time: "2019-02-26", value: 98.980003 },
    { time: "2019-02-27", value: 97.699997 },
    { time: "2019-02-28", value: 97.099998 },
    { time: "2019-03-01", value: 96.760002 },
    { time: "2019-03-04", value: 98.360001 },
    { time: "2019-03-05", value: 96.260002 },
    { time: "2019-03-06", value: 98.120003 },
    { time: "2019-03-07", value: 99.68 },
    { time: "2019-03-11", value: 102.1 },
    { time: "2019-03-12", value: 100.22 },
    { time: "2019-03-13", value: 100.5 },
    { time: "2019-03-14", value: 99.660004 },
    { time: "2019-03-15", value: 100.08 },
    { time: "2019-03-18", value: 99.919998 },
    { time: "2019-03-19", value: 99.459999 },
    { time: "2019-03-20", value: 98.220001 },
    { time: "2019-03-21", value: 97.300003 },
    { time: "2019-03-22", value: 97.660004 },
    { time: "2019-03-25", value: 97 },
    { time: "2019-03-26", value: 97.019997 },
    { time: "2019-03-27", value: 96.099998 },
    { time: "2019-03-28", value: 96.699997 },
    { time: "2019-03-29", value: 96.300003 },
    { time: "2019-04-01", value: 97.779999 },
    { time: "2019-04-02", value: 98.360001 },
    { time: "2019-04-03", value: 98.5 },
    { time: "2019-04-04", value: 98.360001 },
    { time: "2019-04-05", value: 99.540001 },
    { time: "2019-04-08", value: 98.580002 },
    { time: "2019-04-09", value: 97.239998 },
    { time: "2019-04-10", value: 97.32 },
    { time: "2019-04-11", value: 98.400002 },
    { time: "2019-04-12", value: 98.220001 },
    { time: "2019-04-15", value: 98.720001 },
    { time: "2019-04-16", value: 99.120003 },
    { time: "2019-04-17", value: 98.620003 },
    { time: "2019-04-18", value: 98 },
    { time: "2019-04-19", value: 97.599998 },
    { time: "2019-04-22", value: 97.599998 },
    { time: "2019-04-23", value: 96.800003 },
    { time: "2019-04-24", value: 96.32 },
    { time: "2019-04-25", value: 96.339996 },
    { time: "2019-04-26", value: 97.120003 },
    { time: "2019-04-29", value: 96.980003 },
    { time: "2019-04-30", value: 96.32 },
    { time: "2019-05-02", value: 96.860001 },
    { time: "2019-05-03", value: 96.699997 },
    { time: "2019-05-06", value: 94.940002 },
    { time: "2019-05-07", value: 94.5 },
    { time: "2019-05-08", value: 94.239998 },
    { time: "2019-05-10", value: 92.900002 },
    { time: new Date(1557557800000).toISOString(), value: 70 },
    { time: "2019-05-13", value: 91.279999 },
    { time: "2019-05-14", value: 91.599998 },
    { time: "2019-05-15", value: 90.080002 },
    { time: "2019-05-16", value: 91.68 },
    { time: "2019-05-17", value: 91.959999 },
    { time: "2019-05-20", value: 91.080002 },
    { time: "2019-05-21", value: 90.760002 },
    { time: "2019-05-22", value: 91 },
    { time: "2019-05-23", value: 90.739998 },
    { time: "2019-05-24", value: 91 },
    { time: "2019-05-27", value: 91.199997 },
    { time: "2019-05-28", value: 90.68 },
    { time: "2019-05-29", value: 91.120003 },
    { time: "2019-05-30", value: 90.419998 },
    { time: "2019-05-31", value: 93.800003 },
    { time: "2019-06-03", value: 96.800003 },
    { time: "2019-06-04", value: 96.34 },
    { time: "2019-06-05", value: 95.94}
  ]);
  // series.setData(dataset);
}

export function tooltipHandler (param, series, containerNode, tooltipStoreHandler) {
  if (
    param.point === undefined
    || !param.time
    || param.point.x < 0
    || param.point.x > containerNode.clientWidth
    || param.point.y < 0
    || param.point.y > containerNode.clientHeight
  ) {
    tooltipStoreHandler({ show: false, style: {} });
  } else {
    const tooltipHeight = 48;
    const tooltipWeight = 84;
    const tooltipMargin = 6;

    const date = param.time.day + '/' + param.time.month + '/' + param.time.year;

    const price = Math.round(param.seriesPrices.get(series) * 100) / 100;

    const coordinate = series.priceToCoordinate(price);
    if (coordinate === null) return;

    let shiftedCoordinate = param.point.x;
    shiftedCoordinate = Math.max(0, Math.min(containerNode.clientWidth - tooltipWeight, shiftedCoordinate));
    const coordinateY = coordinate - tooltipHeight - tooltipMargin > 0
      ? coordinate - tooltipHeight - tooltipMargin
      : Math.max(0, Math.min(containerNode.clientHeight - tooltipHeight - tooltipMargin, coordinate + tooltipMargin));
    const tooltipStyle = {
      left: shiftedCoordinate + 'px',
      top: coordinateY + 'px',
    };

    tooltipStoreHandler({ show: true, style: tooltipStyle, price, date });
  }
}
