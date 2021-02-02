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

  direction: cnst.CRYPTO_SELL,
  exchangeData: [],
  giveList: [],
  getList: [],
  variantList: [],
  giveSelected: {},
  getSelected:  {},
  variantSelected: {},

  giveAmount: null,
  giveError: null,
  getAmount: null,

  step: exchangeStepList[0].index,

  loading: false,
  error: undefined,
};

const reducer = {
  [Types.LOAD_DATA]: draft => {
    // country
    draft.countryList = countryOpts;
    draft.countrySelected = countryOpts[0].value;

    // exchange data
    draft.exchangeData = dataFromServer;

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
    const giveSelected = draft.giveList.filter(item => item.value === payload);
    draft.giveSelected = giveSelected[0];

    draft.getList = giveSelected[0].method;
    draft.getSelected = giveSelected[0].method[0];

    draft.variantList = giveSelected[0].method[0].variants;
    draft.variantSelected = giveSelected[0].method[0].variants[0];

    if (draft.variantSelected) {
      const { isValid, errorText } = validateValue({ value: draft.giveError, rules: draft.variantSelected.rules });

      if (draft.giveError && isValid) {
        draft.giveError = null;
      } else {
        draft.giveError = errorText;
      }
    }
  },

  [Types.CHOSE_GET_OPTION]: (draft, payload) => {
    const getSelected = draft.getList.filter(item => item.value === payload);
    draft.getSelected = getSelected[0];

    draft.variantList = getSelected[0].variants;
    draft.variantSelected = getSelected[0].variants[0];

    if (draft.variantSelected) {
      const { isValid, errorText } = validateValue({ value: draft.giveError, rules: draft.variantSelected.rules });

      if (draft.giveError && isValid) {
        draft.giveError = null;
      } else {
        draft.giveError = errorText;
      }
    }
  },

  [Types.CHOOSE_VARIANT_OPTION]: (draft, payload) => {
    draft.variantSelected = draft.variantList.filter(item => item.value === payload)[0];

    if (draft.variantSelected) {
      const { isValid, errorText } = validateValue({ value: draft.giveError, rules: draft.variantSelected.rules });

      if (draft.giveError && isValid) {
        draft.giveError = null;
      } else {
        draft.giveError = errorText;
      }
    }
  },

  [Types.CHANGE_GIVE_AMOUNT]: (draft, payload) => {
    draft.giveAmount = payload;
    const { isValid, errorText } = validateValue({ value: payload, rules: draft.variantSelected.rules });

    if (draft.direction === cnst.CRYPTO_SELL) {
      draft.getAmount = getAmount((payload * price), draft.sellPercent, 3);
    } else {
      draft.getAmount = getAmount((payload / price), draft.buyPercent, 8);
    }

    if (draft.giveError && isValid) {
      draft.giveError = null;
    } else {
      draft.giveError = errorText;
    }
  },

  [Types.CHANGE_GIVE_AMOUNT_ERROR]: (draft, payload) => draft.giveError = payload,

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

    if (draft.giveError && isValid) {
      draft.giveError = null;
    } else {
      draft.giveError = errorText;
    }
  },

  [Types.NEXT_STEP]: draft => {
    draft.step = draft.step + 1;
  },
};

export default createReducer(reducer, initialStore);

