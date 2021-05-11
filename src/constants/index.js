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
};

const transactionProcess = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
};

const color = {
  colorApp: 'rgba(23, 27, 31, 1)',
  colorSecondaryText: 'rgba(255, 255, 255, 0.5)',
  colorBackgroundLight: 'rgba(255, 255, 255, 0.05)',
  colorActive: 'rgba(246, 165, 8, 1)',
  colorBackground: 'rgba(34, 39, 45, 1)',
}

export {
  exchangeDirection,
  exchangeStream,
  transactionProcess,
  languageOpts,
  sidebarOpts,
  exchangeStepList,
  routes,
  routesList,
  color,
};
