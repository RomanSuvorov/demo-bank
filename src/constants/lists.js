import React from 'react';

import {
  RussianFlagIcon,
  ExchangeIcon,
  ReviewIcon,
  FaqIcon,
  ContactIcon,
} from './icons';

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
    key: 'exchange',
    value: 'exchange',
    text: 'Обмен',
    Icon: ExchangeIcon,
  },
  {
    key: 'review',
    value: 'review',
    text: 'Отзывы',
    Icon: ReviewIcon,
  },
  {
    key: 'faq',
    value: 'faq',
    text: 'FAQ',
    Icon: FaqIcon,
  },
  {
    key: 'contact',
    value: 'contact',
    text: 'Контакты',
    Icon: ContactIcon,
  },
];

export {
  languageOpts,
  sidebarOpts,
};
