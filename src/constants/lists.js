import React from 'react';

import {
  RussianLangIcon,
  GreatBritainLangIcon,
  UkrainianLangIcon,
  RussianFlagIcon,
  GreatBritainFlagIcon,
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
    iconUrl: 'https://i.ibb.co/R49XXgB/russia-lang.png'
  },
  {
    key: 'ukrainian',
    value: 'uk',
    text: '',
    iconUrl: 'https://i.ibb.co/6wqtCb8/ukraine-lang.png',
  },
  {
    key: 'english',
    value: 'en',
    text: '',
    iconUrl: 'https://i.ibb.co/xhxNjHr/united-kingdom-lang.png',
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
    key: 'russian_federation',
    value: 'RU',
    text: 'Российская Федерация',
    iconUrl: 'https://i.ibb.co/pfxdGWd/russia.png',
  },
  {
    key: 'ukraine',
    value: 'UA',
    text: 'Украина',
    iconUrl: 'https://i.ibb.co/ByNPx0T/ukraine.png',
  },
  {
    key: 'great_britain',
    value: 'GB',
    text: 'Великобритания',
    iconUrl: 'https://i.ibb.co/xzWsdKK/united-kingdom.png',
  },
];

const exchangeStepList = [
  {
    index: 1,
    Component: 'FirstStep',
  },
  {
    index: 2,
    Component: 'SecondStep',
  },
  {
    index: 3,
    Component: 'ThirdStep',
  },
  {
    index: 4,
    Component: 'FinishStep',
  },
];

export {
  languageOpts,
  sidebarOpts,
  countryOpts,
  exchangeStepList,
};
