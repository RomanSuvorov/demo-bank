import React from 'react';

import {
  RussianFlagIcon,
  ExchangeIcon,
  ReviewIcon,
  FaqIcon,
  ContactIcon,
} from './icons';
import { routes } from './routes';

const languageOpts = [
  {
    key: 'russian',
    value: 'rus',
    text: '',
    Icon: RussianFlagIcon
  },
  {
    key: 'ukrainian',
    value: 'ukr',
    text: '',
    Icon: RussianFlagIcon,
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

export {
  languageOpts,
  sidebarOpts,
};
