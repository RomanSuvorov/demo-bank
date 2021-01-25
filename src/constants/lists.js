import React from 'react';

import {
  RussianLangIcon,
  UkrainianFlagIcon,
  ExchangeIcon,
  ReviewIcon,
  FaqIcon,
  ContactIcon,
} from './icons';
import { routes } from './routes';

const languageOpts = [
  {
    key: 'russian',
    value: 'ru',
    text: '',
    Icon: RussianLangIcon
  },
  {
    key: 'ukrainian',
    value: 'ua',
    text: '',
    Icon: RussianLangIcon,
  },
];

const sidebarOpts = [
  {
    key: routes.EXCHANGE.key,
    path: routes.EXCHANGE.path,
    text: 'Обмен',
    Icon: ExchangeIcon,
  },
  {
    key: routes.REVIEW.key,
    path: routes.REVIEW.path,
    text: 'Отзывы',
    Icon: ReviewIcon,
  },
  {
    key: routes.FAQ.key,
    path: routes.FAQ.path,
    text: 'FAQ',
    Icon: FaqIcon,
  },
  {
    key: routes.FAQ.key + 1,
    path: routes.FAQ.path,
    text: 'Контакты',
    Icon: ContactIcon,
  },
];

const countryOpts = [
  {
    key: 'russian',
    value: 'ru',
    text: 'Россия',
    Icon: UkrainianFlagIcon,
  },
  {
    key: 'ukrainian',
    value: 'ua',
    text: 'Украина',
    Icon: UkrainianFlagIcon,
  },
];

const exchangeCryptoOpts = {
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
}

const exchangeMethodOpts = {
  cash: {},
  card: {},
}

const bankOpts = [
  {
    key: 'card',
    value: 'card',
    text: 'Карта',
    Icon: '',
  },
];

const currencyOpts = [

];

export {
  languageOpts,
  sidebarOpts,
  countryOpts,
  exchangeCryptoOpts,
  exchangeMethodOpts,
};
