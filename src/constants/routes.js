import { ExchangeScreen } from '../screens/ExchangeScreen';
import { ReviewScreen } from '../screens/ReviewScreen';
import { FaqScreen } from '../screens/FaqScreen';

const routes = {
  DEFAULT: {
    key: 'DEFAULT',
    path: '/',
  },
  EXCHANGE: {
    key: 'EXCHANGE',
    path: '/exchange',
  },
  REVIEW: {
    key: 'REVIEW',
    path: '/review',
  },
  FAQ: {
    key: 'FAQ',
    path: '/faq',
  },
  CONTACTS: {
    key: 'CONTACTS',
  },
};

const routesList = [
  {
    path: [routes.DEFAULT.path, routes.EXCHANGE.path],
    key: routes.EXCHANGE.key,
    Component: ExchangeScreen,
    exact: true,
  },
  {
    path: routes.REVIEW.path,
    key: routes.REVIEW.key,
    Component: ReviewScreen,
    exact: true,
  },
  {
    path: routes.FAQ.path,
    key: routes.FAQ.key,
    Component: FaqScreen,
    exact: true,
  },
];

export { routes, routesList };
