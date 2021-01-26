import Types from './types';
import { createReducer } from '../../sdk/helper'
import { cnst } from '../../constants';

const cryptoOpts = {
  btc: {
    key: 'btc',
    value: 'btc',
    text: 'Bitcoin BTC',
    method: {
      cash: {
        key: 'cash',
        value: 'cash',
        text: 'Кеш',
        list: [
          {
            key: 'usd',
            value: 'usd',
            text: 'USD',
            Icon: '',
          },
          {
            key: 'uah',
            value: 'uah',
            text: 'UAH',
            Icon: '',
          },
        ],
      },
      card: {
        value: 'card',
        text: 'Карта',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
          {
            key: 'raiffeisen',
            value: 'raiffeisen',
            text: 'Райффайзен Банк UAH',
            Icon: '',
          },
          {
            key: 'pumb',
            value: 'pumb',
            text: 'ПУМБ UAH',
            Icon: '',
          },
          {
            key: 'oschadbank',
            value: 'oschadbank',
            text: 'Ощадбанк UAH',
            Icon: '',
          },
        ],
      },
    }
  },
  bch: {
    key: 'bch',
    value: 'bch',
    text: 'Bitcoin Cash BCH',
    method: {
      card: {
        key: 'card',
        value: 'card',
        text: 'Карта',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ],
      },
    }
  },
  xrp: {
    key: 'xrp',
    value: 'xrp',
    text: 'Ripple XRP',
    method: {
      card: {
        key: 'card',
        value: 'card',
        text: 'Карта',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ],
      },
    }
  },
  ltc: {
    key: 'ltc',
    value: 'ltc',
    text: 'Litecoin LTC',
    method: {
      card: {
        key: 'card',
        value: 'card',
        text: 'Карта',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ],
      },
    }
  },
  usdt: {
    key: 'usdt',
    value: 'usdt',
    text: 'TetherUS (USDT) USDT',
    method: {
      cash: {
        key: 'cash',
        value: 'cash',
        text: 'Кеш',
        list: [
          {
            key: 'usd',
            value: 'usd',
            text: 'USD',
            Icon: '',
          },
        ],
      },
      card: {
        key: 'card',
        value: 'card',
        text: 'Карта',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ],
      },
    }
  },
  usdt_trc20: {
    key: 'usdt_trc20',
    value: 'usdt_trc20',
    text: 'USDT (TRC-20) USDT',
    method: {
      card: {
        key: 'card',
        value: 'card',
        text: 'Карта',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ],
      },
    }
  },
  usdt_erc20: {
    key: 'usdt_erc20',
    value: 'usdt_erc20',
    text: 'USDT (ERC-20) USDT',
    method: {
      card: {
        key: 'card',
        value: 'card',
        text: 'Карта',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ],
      },
    }
  },
  eth: {
    key: 'eth',
    value: 'eth',
    text: 'Ethereum ETH',
    method: {
      cash: {
        key: 'cash',
        value: 'cash',
        text: 'Кеш',
        list: [
          {
            key: 'usd',
            value: 'usd',
            text: 'USD',
            Icon: '',
          },
        ],
      },
      card: {
        key: 'card',
        value: 'card',
        text: 'Карта',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ],
      },
    }
  },
};

const methodOpts = {
  cash: {
    key: 'cash',
    value: 'cash',
    text: 'Кеш',
    method: {
      btc: {
        key: 'btc',
        value: 'btc',
        text: 'Bitcoin BTC',
        list: [
          {
            key: 'usd',
            value: 'usd',
            text: 'USD',
            Icon: '',
          },
          {
            key: 'uah',
            value: 'uah',
            text: 'UAH',
            Icon: '',
          },
        ],
      },
      usdt: {
        key: 'usdt',
        value: 'usdt',
        text: 'TetherUS (USDT) USDT',
        list: [
          {
            key: 'usd',
            value: 'usd',
            text: 'USD',
            Icon: '',
          },
        ],
      },
    },
  },
  card: {
    key: 'card',
    value: 'card',
    text: 'Карта',
    method: {
      btc: {
        key: 'btc',
        value: 'btc',
        text: 'Bitcoin BTC',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
          {
            key: 'raiffeisen',
            value: 'raiffeisen',
            text: 'Райффайзен Банк UAH',
            Icon: '',
          },
          {
            key: 'pumb',
            value: 'pumb',
            text: 'ПУМБ UAH',
            Icon: '',
          },
          {
            key: 'oschadbank',
            value: 'oschadbank',
            text: 'Ощадбанк UAH',
            Icon: '',
          },
        ]
      },
      bch: {
        key: 'bch',
        value: 'bch',
        text: 'Bitcoin Cash BCH',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ]
      },
      xrp: {
        key: 'xrp',
        value: 'xrp',
        text: 'Ripple XRP',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ]
      },
      ltc: {
        key: 'ltc',
        value: 'ltc',
        text: 'Litecoin LTC',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ]
      },
      usdt: {
        key: 'usdt',
        value: 'usdt',
        text: 'TetherUS (USDT) USDT',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ]
      },
      usdt_trc20: {
        key: 'usdt_trc20',
        value: 'usdt_trc20',
        text: 'USDT (TRC-20) USDT',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ]
      },
      usdt_erc20: {
        key: 'usdt_erc20',
        value: 'usdt_erc20',
        text: 'USDT (ERC-20) USDT',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ]
      },
      eth: {
        key: 'eth',
        value: 'eth',
        text: 'Ethereum ETH',
        list: [
          {
            key: 'privat24',
            value: 'privat24',
            text: 'Приват24 UAH',
            Icon: '',
          },
          {
            key: 'monobank',
            value: 'monobank',
            text: 'Монобанк UAH',
            Icon: '',
          },
        ]
      },
    },
  },
};

const resetFirstOption = (array, value) => {
  const firstKey = Object.keys(array)[0];
  const firstKeyOfMethod = Object.keys(array[value ? value : firstKey].method)[0];

  return { firstKey, firstKeyOfMethod };
};

const initialStore = {
  countryPercent: 'UA',
  buyPercent: 0.0,
  sellPercent: 0.0,

  direction: cnst.CRYPTO_GIVE,
  cryptoList: cryptoOpts,
  methodList: methodOpts,
  giveSelected: undefined,
  getSelected:  undefined,
  chooseSelect: undefined,

  loading: false,
  error: undefined,
};

const reducer = {
  [Types.CHANGE_COUNTRY_PERCENT]: (draft, payload) => {
    draft.countryPercent = payload.country;
  },

  [Types.CHANGE_DIRECTION]: draft => {
    if (draft.direction === cnst.CRYPTO_GIVE) {
      draft.direction = cnst.CRYPTO_GET;

      const { firstKey, firstKeyOfMethod } = resetFirstOption(draft.methodList);
      draft.giveSelected = draft.methodList[firstKey].value;
      draft.getSelected = draft.methodList[firstKey].method[firstKeyOfMethod].value;
    } else {
      draft.direction = cnst.CRYPTO_GIVE;

      const { firstKey, firstKeyOfMethod } = resetFirstOption(draft.cryptoList);
      draft.giveSelected = draft.cryptoList[firstKey].value;
      draft.getSelected = draft.cryptoList[firstKey].method[firstKeyOfMethod].value;
    }
  },

  [Types.CHOSE_GIVE_OPTION]: (draft, payload) => {
    draft.giveSelected = payload;

    if (draft.direction === cnst.CRYPTO_GIVE) {
      const { firstKeyOfMethod } = resetFirstOption(draft.cryptoList, payload);
      draft.giveSelected = payload;
      draft.getSelected = draft.cryptoList[payload].method[firstKeyOfMethod].value;
    } else {
      const { firstKeyOfMethod } = resetFirstOption(draft.methodList, payload);
      draft.giveSelected = payload;
      draft.getSelected = draft.methodList[payload].method[firstKeyOfMethod].value;
    }
  },

  [Types.CHOSE_GET_OPTION]: (draft, payload) => draft.getSelected = payload,
};

export default createReducer(reducer, initialStore);

