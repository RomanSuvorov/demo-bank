import Types from './types';
import AppTypes from './types';

// <--- MOCK DATA ---> //
const mockPins = [
  {
    title: 'Mexico',
    lat: '26.983901902317516',
    lng: '-103.7732236874951',
    description: '',
  },
  {
    title: 'South Africa',
    lat: '-28.65474416943805',
    lng: '23.756416832938562',
    description: '',
  },
  {
    title: 'Ukraine',
    lat: '49.488478282617784',
    lng: '31.776147051575336',
    description: '',
  },
];

const mockBanner = {
  link: 'https:google.com',
  linkPosition: 'right',
  linkName: 'Google',
  src: 'Pe0Ci3z5xTw',
  type: 'video',
  title: 'Banner title',
  titlePosition: 'left',
  description: 'Banner Description',
  descriptionPosition: 'left',
};

const mockCheckboxes = [
  {
    value: 'BTCUSDT',
    label: 'BTC / USDT',
  },
  {
    value: 'BCHUSDT',
    label: 'BCH / USDT',
  },
  {
    value: 'XRPUSDT',
    label: 'XRP / USDT',
  },
  {
    value: 'LTCUSDT',
    label: 'LTC / USDT',
  },
  {
    value: 'ETHUSDT',
    label: 'ETH / USDT',
  },
];

export const loadPinData = () => async (dispatch) => {
  dispatch({ type: Types.LOAD_PIN_START });

  try {
    // TODO: await from server;
    const pins = mockPins;

    dispatch({ type: Types.LOAD_PIN_SUCCESS, payload: pins });
  } catch (e) {
    dispatch({ type: Types.LOAD_PIN_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.LOAD_PIN_FINISH });
  }
}

export const loadBannerData = () => async (dispatch) => {
  dispatch({ type: Types.LOAD_BANNER_START });

  try {
    // TODO: await from server;
    const banner = mockBanner;

    dispatch({ type: Types.LOAD_BANNER_SUCCESS, payload: banner });
  } catch (e) {
    dispatch({ type: Types.LOAD_BANNER_ERROR, payload: e });

  } finally {
    dispatch({ type: Types.LOAD_BANNER_FINISH });
  }
};

export const loadChartData = () => async (dispatch) => {
  dispatch({ type: Types.LOAD_CHART_DATA_START });

  try {
    // TODO: await from server;
    const checkboxes = mockCheckboxes;

    dispatch({ type: Types.LOAD_CHART_DATA_SUCCESS, payload: checkboxes });
  } catch (e) {
    dispatch({ type: Types.LOAD_CHART_DATA_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.LOAD_CHART_DATA_FINISH });
  }
};

export const changeChartPeriod = (time) => async (dispatch) => {
  dispatch({ type: AppTypes.TOGGLE_TIME_PERIOD, payload: time });

  // TODO: change time period on server;
}
