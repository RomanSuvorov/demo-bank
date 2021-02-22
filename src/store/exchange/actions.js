import Types from './types';
import { exchangeDirection, exchangeStream } from '../../constants';
import { getSelectorsData } from '../../sdk/helper';
// <--- MOCK DATA ---> //

const countryOpts = [
  {
    key: 'russian_federation',
    value: 'RU',
    text: 'Российская Федерация',
    iconUrl: 'https://i.ibb.co/pfxdGWd/russia.png',
    sellPercent: '+1.0',
    buyPercent: '-1.0',
  },
  {
    key: 'ukraine',
    value: 'UA',
    text: 'Украина',
    iconUrl: 'https://i.ibb.co/ByNPx0T/ukraine.png',
    sellPercent: '+1.1',
    buyPercent: '-1.1',
  },
  {
    key: 'great_britain',
    value: 'GB',
    text: 'Великобритания',
    iconUrl: 'https://i.ibb.co/xzWsdKK/united-kingdom.png',
    sellPercent: '+0.9',
    buyPercent: '-0.9',
  },
];

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

// <--- ---> //

export const loadExchangeData = () => async (dispatch, getState) => {
  const store = getState();
  const { direction } = store.exchange;

  dispatch({ type: Types.LOAD_DATA_START });

  try {
    // TODO: await from server;
    const countryList = countryOpts;
    // TODO: await from server;
    const data = dataFromServer;

    const giveList = data.filter(item => (direction === exchangeDirection.CRYPTO_SELL) ? item.isCrypto : !item.isCrypto);
    const {
      giveSelected,
      getList,
      getSelected,
      variantList,
      variantSelected,
    } = getSelectorsData(giveList, undefined, 1);

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
      countryList: countryList,
      countrySelected: countryList[0].value,
      sellPercent: countryOpts[0].sellPercent,
      buyPercent: countryOpts[0].buyPercent,
      exchangeData: data,
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

export const preventSendingByUser = () => async (dispatch) => {
  // TODO: send to bot that user prevent sending money for system;
};
