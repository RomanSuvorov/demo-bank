import { languageOpts, sidebarOpts, exchangeStepList } from './lists';
import { routes, routesList } from './routes';

const exchangeDirection = {
  CRYPTO_SELL: 'CRYPTO_SELL', // buy or sell
  CRYPTO_BUY: 'CRYPTO_BUY',
};

const exchangeStream = {
  SELL_BY_CASH: 'SELL_BY_CASH',
  SELL_BY_CARD: 'SELL_BY_CARD',
  BUY_BY_CASH: 'BUY_BY_CASH',
  BUY_BY_CARD: 'BUY_BY_CARD'
}

export {
  exchangeDirection,
  exchangeStream,
  languageOpts,
  sidebarOpts,
  exchangeStepList,
  routes,
  routesList,
};
