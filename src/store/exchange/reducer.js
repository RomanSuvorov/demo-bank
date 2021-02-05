import Types from './types';
import { createReducer, validateValue } from '../../sdk/helper'
import { cnst, exchangeStepList } from '../../constants';
import { countryOpts } from '../../constants';

const dataFromServer = [
  {
    key: 'btc',
    value: 'btc',
    text: 'Bitcoin BTC',
    method: [
      {
        key: 'cash',
        value: 'cash',
        text: 'Кеш',
        variants: [
          {
            key: 'usd',
            value: 'usd',
            text: 'USD',
            iconUrl: 'https://i.ibb.co/BLK3p4P/usd.png',
            rules: [
              { name: 'required', text: 'Field is required' },
              { name: 'minNumber', value: 0.01, text: 'Min number: 0.01' },
              { name: 'maxNumber', value: 2, text: 'Max number: 2' },
            ]
          },
          {
            key: 'uah',
            value: 'uah',
            text: 'UAH',
            iconUrl: 'https://i.ibb.co/BqVfdg7/uah.png',
          },
        ],
      },
      {
        key: 'card',
        value: 'card',
        text: 'Карта',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
          {
            key: 'raiffeisen',
            value: 'raiffeisen',
            text: 'Райффайзен Банк UAH',
            iconUrl: 'https://i.ibb.co/dGDpx5r/raiffaisen.png',
          },
          {
            key: 'pumb',
            value: 'pumb',
            text: 'ПУМБ UAH',
            iconUrl: 'https://i.ibb.co/yYhDS5L/pumb.png',
          },
          {
            key: 'oschadbank',
            value: 'oschadbank',
            text: 'Ощадбанк UAH',
            iconUrl: 'https://i.ibb.co/mHGkhvW/oshad.png',
          },
        ],
      },
    ],
    isCrypto: true,
  },
  {
    key: 'bch',
    value: 'bch',
    text: 'Bitcoin Cash BCH',
    method: [
      {
        key: 'card',
        value: 'card',
        text: 'Карта',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ],
      },
    ],
    isCrypto: true,
  },
  {
    key: 'xrp',
    value: 'xrp',
    text: 'Ripple XRP',
    method: [
      {
        key: 'card',
        value: 'card',
        text: 'Карта',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ],
      },
    ],
    isCrypto: true,
  },
  {
    key: 'ltc',
    value: 'ltc',
    text: 'Litecoin LTC',
    method: [
      {
        key: 'card',
        value: 'card',
        text: 'Карта',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ],
      },
    ],
    isCrypto: true,
  },
  {
    key: 'usdt',
    value: 'usdt',
    text: 'TetherUS (USDT) USDT',
    method: [
      {
        key: 'cash',
        value: 'cash',
        text: 'Кеш',
        variants: [
          {
            key: 'usd',
            value: 'usd',
            text: 'USD',
            iconUrl: 'https://i.ibb.co/BLK3p4P/usd.png',
          },
        ],
      },
      {
        key: 'card',
        value: 'card',
        text: 'Карта',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ],
      },
    ],
    isCrypto: true,
  },
  {
    key: 'usdt_trc20',
    value: 'usdt_trc20',
    text: 'USDT (TRC-20) USDT',
    method: [
      {
        key: 'card',
        value: 'card',
        text: 'Карта',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ],
      },
    ],
    isCrypto: true,
  },
  {
    key: 'usdt_erc20',
    value: 'usdt_erc20',
    text: 'USDT (ERC-20) USDT',
    method: [
      {
        key: 'card',
        value: 'card',
        text: 'Карта',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ],
      },
    ],
    isCrypto: true,
  },
  {
    key: 'eth',
    value: 'eth',
    text: 'Ethereum ETH',
    method: [
      {
        key: 'cash',
        value: 'cash',
        text: 'Кеш',
        variants: [
          {
            key: 'usd',
            value: 'usd',
            text: 'USD',
            iconUrl: 'https://i.ibb.co/BLK3p4P/usd.png',
          },
        ],
      },
      {
        key: 'card',
        value: 'card',
        text: 'Карта',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ],
      },
    ],
    isCrypto: true,
  },
  {
    key: 'cash',
    value: 'cash',
    text: 'Кеш',
    method: [
      {
        key: 'btc',
        value: 'btc',
        text: 'Bitcoin BTC',
        variants: [
          {
            key: 'usd',
            value: 'usd',
            text: 'USD',
            iconUrl: 'https://i.ibb.co/BLK3p4P/usd.png',
          },
          {
            key: 'uah',
            value: 'uah',
            text: 'UAH',
            iconUrl: 'https://i.ibb.co/BqVfdg7/uah.png',
          },
        ],
      },
      {
        key: 'usdt',
        value: 'usdt',
        text: 'TetherUS (USDT) USDT',
        variants: [
          {
            key: 'usd',
            value: 'usd',
            text: 'USD',
            iconUrl: 'https://i.ibb.co/BLK3p4P/usd.png',
          },
        ],
      },
    ],
    isCrypto: false,
  },
  {
    key: 'card',
    value: 'card',
    text: 'Карта',
    method: [
      {
        key: 'btc',
        value: 'btc',
        text: 'Bitcoin BTC',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
          {
            key: 'raiffeisen',
            value: 'raiffeisen',
            text: 'Райффайзен Банк UAH',
            iconUrl: 'https://i.ibb.co/dGDpx5r/raiffaisen.png',
          },
          {
            key: 'pumb',
            value: 'pumb',
            text: 'ПУМБ UAH',
            iconUrl: 'https://i.ibb.co/yYhDS5L/pumb.png',
          },
          {
            key: 'oschadbank',
            value: 'oschadbank',
            text: 'Ощадбанк UAH',
            iconUrl: 'https://i.ibb.co/mHGkhvW/oshad.png',
          },
        ]
      },
      {
        key: 'bch',
        value: 'bch',
        text: 'Bitcoin Cash BCH',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ]
      },
      {
        key: 'xrp',
        value: 'xrp',
        text: 'Ripple XRP',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ]
      },
      {
        key: 'ltc',
        value: 'ltc',
        text: 'Litecoin LTC',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ]
      },
      {
        key: 'usdt',
        value: 'usdt',
        text: 'TetherUS (USDT) USDT',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ]
      },
      {
        key: 'usdt_trc20',
        value: 'usdt_trc20',
        text: 'USDT (TRC-20) USDT',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ]
      },
      {
        key: 'usdt_erc20',
        value: 'usdt_erc20',
        text: 'USDT (ERC-20) USDT',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ]
      },
      {
        key: 'eth',
        value: 'eth',
        text: 'Ethereum ETH',
        variants: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            iconUrl: 'https://i.ibb.co/8gJGqSB/privat.png',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            iconUrl: 'https://i.ibb.co/nRZnsFz/mono.png',
          },
        ]
      },
    ],
    isCrypto: false,
  },
];

const deliverList = [
  {
    key: 'russian_federation',
    value: 'russian_federation',
    text: 'Российская Федерация',
    cityList: [
      {
        key: 'moscow',
        value: 'moscow',
        text: 'Москва',
      },
      {
        key: 'st_petersburg',
        value: 'st_petersburg',
        text: 'Санкт-Петербург',
      },
    ],
  },
  {
    key: 'ukraine',
    value: 'ukraine',
    text: 'Украина',
    cityList: [
      {
        key: 'kyiv',
        value: 'kyiv',
        text: 'Киев',
      },
      {
        key: 'kharkov',
        value: 'kharkov',
        text: 'Харков',
      },
    ]
  },
];

const prepareSelectors = (direction) => {
  const giveList = dataFromServer.filter(item => (direction === cnst.CRYPTO_SELL) ? item.isCrypto : !item.isCrypto);
  const getList = giveList[0].method;
  const variantList = getList[0].variants;

  return {
    giveList,
    getList,
    variantList,
  };
};

const getAmount = (action, percent, fractionDigits) => {
  return (action + ((action * (+percent)) / 100)).toFixed(fractionDigits);
}

const price = 28000;

const initialStore = {
  countryList: [],
  countrySelected: '', // value
  buyPercent: '-1.0',
  sellPercent: '+1.0',

  // 1st step
  direction: cnst.CRYPTO_SELL,
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
  transferData: null,
  transactionStatus: 'await',

  // finish step

  // navigation
  step: exchangeStepList[0].index,

  // state of process
  loading: false,
  error: undefined,
};

const reducer = {
  [Types.LOAD_DATA]: draft => {
    // country
    draft.countryList = countryOpts;
    draft.countrySelected = countryOpts[0].value;

    const { giveList, getList, variantList } = prepareSelectors(draft.direction);
    // first select
    draft.giveList = giveList;
    draft.giveSelected = giveList[0];

    // second select
    draft.getList = getList;
    draft.getSelected = getList[0];

    // third select
    draft.variantList = variantList;
    draft.variantSelected = variantList[0];

    // deliver data
    draft.deliverCountryList = deliverList;

    const localUserData = JSON.parse(localStorage.getItem('user_data'));
    if (localUserData) {
      draft.forgetInputsValue = false;
      draft.cardValue = localUserData.cardValue;
      draft.walletValue = localUserData.walletValue;
      draft.accountValue = localUserData.accountValue;
      draft.deliverCountrySelected = localUserData.deliverCountrySelected;
      if (localUserData.deliverCountrySelected) {
        draft.deliverCityList = draft.deliverCountryList.find(country => country.value === localUserData.deliverCountrySelected.value).cityList;
      }
      draft.deliverCitySelected = localUserData.deliverCitySelected;
    }
  },

  [Types.CHANGE_COUNTRY_PERCENT]: (draft, payload) => {
    draft.countrySelected = payload;
  },

  [Types.CHANGE_DIRECTION]: draft => {
    const newDirection = draft.direction === cnst.CRYPTO_SELL ? cnst.CRYPTO_BUY : cnst.CRYPTO_SELL;
    draft.direction = newDirection;

    const { giveList, getList, variantList } = prepareSelectors(newDirection);
    // first select
    draft.giveList = giveList;
    draft.giveSelected = giveList[0];

    // second select
    draft.getList = getList;
    draft.getSelected = getList[0];

    // third select
    draft.variantList = variantList;
    draft.variantSelected = variantList[0];

    // inputs
    draft.giveAmount = null;
    draft.getAmount = null;
    draft.giveError = null;
  },

  [Types.CHOSE_GIVE_OPTION]: (draft, payload) => {
    const giveSelected = draft.giveList.find(item => item.value === payload);
    draft.giveSelected = giveSelected;

    draft.getList = giveSelected.method;
    draft.getSelected = giveSelected.method[0];

    draft.variantList = giveSelected.method[0].variants;
    draft.variantSelected = giveSelected.method[0].variants[0];

    if (draft.variantSelected && draft.giveAmount) {
      const { isValid, errorText } = validateValue({ value: draft.giveError, rules: draft.variantSelected.rules });

      if (draft.giveError && isValid) {
        draft.giveError = null;
      } else {
        draft.giveError = errorText;
      }
    }
  },

  [Types.CHOSE_GET_OPTION]: (draft, payload) => {
    const getSelected = draft.getList.find(item => item.value === payload);
    draft.getSelected = getSelected;

    draft.variantList = getSelected.variants;
    draft.variantSelected = getSelected.variants[0];

    if (draft.variantSelected && draft.giveAmount) {
      const { isValid, errorText } = validateValue({ value: draft.giveError, rules: draft.variantSelected.rules });

      if (draft.giveError && isValid) {
        draft.giveError = null;
      } else {
        draft.giveError = errorText;
      }
    }
  },

  [Types.CHOOSE_VARIANT_OPTION]: (draft, payload) => {
    draft.variantSelected = draft.variantList.find(item => item.value === payload);

    if (draft.variantSelected && draft.giveAmount) {
      const { isValid, errorText } = validateValue({ value: draft.giveAmount, rules: draft.variantSelected.rules });

      if (draft.giveError && isValid) {
        draft.giveError = null;
      } else {
        draft.giveError = errorText;
      }
    }
  },

  [Types.CHANGE_GIVE_AMOUNT]: (draft, payload) => {
    draft.giveAmount = payload;

    if (draft.direction === cnst.CRYPTO_SELL) {
      draft.getAmount = getAmount((payload * price), draft.sellPercent, 3);
    } else {
      draft.getAmount = getAmount((payload / price), draft.buyPercent, 8);
    }

    const { isValid, errorText } = validateValue({ value: payload, rules: draft.variantSelected.rules });
    draft.giveError = isValid ? null : errorText;
  },

  [Types.CHANGE_GET_AMOUNT]: (draft, payload) => {
    draft.getAmount = payload;

    let giveAmount;
    if (draft.direction === cnst.CRYPTO_SELL) {
      giveAmount = getAmount((payload / price), draft.sellPercent, 8);
    } else {
      giveAmount = getAmount((payload * price), draft.buyPercent, 3);
    }

    draft.giveAmount = giveAmount;

    const { isValid, errorText } = validateValue({ value: giveAmount, rules: draft.variantSelected.rules });
    draft.giveError = isValid ? null : errorText;
  },

  [Types.CHANGE_CARD_VALUE]: (draft, payload) => draft.cardValue = payload,

  [Types.CHANGE_WALLET_VALUE]: (draft, payload) => draft.walletValue = payload,

  [Types.CHANGE_ACCOUNT_VALUE]: (draft, payload) => draft.accountValue = payload,

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

  [Types.NEXT_STEP]: draft => {
    const currentStep = draft.step;

    if (currentStep === 2) {
      const { isValid: isAccountValid, errorText: accountErrorText } = validateValue({
        value: draft.accountValue,
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
      const { isValid: isInputValid, errorText: inputErrorText } = validateValue({
        value: draft.direction === cnst.CRYPTO_SELL ? draft.cardValue : draft.walletValue,
        rules: draft.direction === cnst.CRYPTO_SELL ? cardRules : walletRules,
      });

      if (isAccountValid && isInputValid) {
        draft.accountError = null;
        if (draft.direction === cnst.CRYPTO_SELL) {
          draft.cardError = null;
        } else {
          draft.walletError = null;
        }
        draft.step = currentStep + 1;

        let localUserData = JSON.parse(localStorage.getItem('user_data'));
        if (draft.forgetInputsValue && localUserData) {
          if (draft.direction === cnst.CRYPTO_SELL) {
            if (draft.getSelected.value === 'cash') {
              delete localUserData.deliverCountrySelected;
              delete localUserData.deliverCitySelected;
            }
            delete localUserData.cardValue;
          } else {
            if (draft.giveSelected.value === 'cash') {
              delete localUserData.deliverCountrySelected;
              delete localUserData.deliverCitySelected;
            }
            delete localUserData.walletValue;
          }

          delete localUserData.accountValue;
        } else {
          localUserData = {
            ...localUserData,
            accountValue: draft.accountValue,

          };

          if (draft.direction === cnst.CRYPTO_SELL) {
            if (draft.getSelected.value === 'cash') {
              localUserData.deliverCountrySelected = draft.deliverCountrySelected;
              localUserData.deliverCitySelected = draft.deliverCitySelected;
            }
            localUserData.cardValue = draft.cardValue;
          } else {
            if (draft.giveSelected.value === 'cash') {
              localUserData.deliverCountrySelected = draft.deliverCountrySelected;
              localUserData.deliverCitySelected = draft.deliverCitySelected;
            }
            localUserData.walletValue = draft.walletValue;
          }
        }

        localStorage.setItem('user_data', JSON.stringify(localUserData));
      } else {
        draft.accountError = accountErrorText;
        if (draft.direction === cnst.CRYPTO_SELL) {
          draft.cardError = inputErrorText;
        } else {
          draft.walletError = inputErrorText;
        }
      }
    } else {
      draft.step = currentStep + 1;
    }
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
        draft.deliverCountryList = [];
        draft.deliverCitySelected = null;
      }
    }

    draft.step = currentStep - 1;
  },
};

export default createReducer(reducer, initialStore);

