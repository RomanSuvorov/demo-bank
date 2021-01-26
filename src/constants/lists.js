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
    Icon: RussianLangIcon
  },
  {
    key: 'ukrainian',
    value: 'uk',
    text: '',
    Icon: UkrainianLangIcon,
  },
  {
    key: 'english',
    value: 'en',
    text: '',
    Icon: GreatBritainLangIcon,
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
    Icon: RussianFlagIcon,
  },
  {
    key: 'ukraine',
    value: 'UA',
    text: 'Украина',
    Icon: UkrainianFlagIcon,
  },
  {
    key: 'great_britain',
    value: 'GB',
    text: 'Великобритания',
    Icon: GreatBritainFlagIcon,
  },
];

export {
  languageOpts,
  sidebarOpts,
  countryOpts,
};
