import Types from './types';
import { config } from '../../constants/config';
import { io } from 'socket.io-client';

import sdk from '../../sdk';

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

export const startApp = () => async (dispatch) => {
  dispatch({ type: Types.APP_START });

  try {
    const { status } = await sdk.api.getStatusApi();

    await dispatch({ type: Types.APP_SUCCESS, payload: { status: status }});

    // if (status) await dispatch(socketConnect());
  } catch (error) {
    dispatch({ type: Types.APP_ERROR, payload: error });
  } finally {
    dispatch({ type: Types.APP_FINISH });
  }
}

export const socketConnect = () => async (dispatch) => {
  const socket = io((config.url || '') + '/');

  dispatch({ type: Types.SOCKET_CONNECTING_START });

  socket.on('connect', () => {
    console.log('--- SOCKET CONNECTED --- ', socket.connected);
    if (socket.connected) {
      dispatch({ type: Types.SOCKET_CONNECTING_SUCCESS, payload: socket });

      dispatch({ type: Types.LOAD_CHART_DATASET_UPDATE });
      socket.emit('charts', { period: "1m" });
    }
  });

  socket.on('connect_error', (err) => {
    dispatch({ type: Types.SOCKET_CONNECTING_ERROR, payload: 'Try to reconnect, please await' });
    setTimeout(() => {
      socket.connect();
    }, 2000);
  });

  socket.on('disconnect', reason => {
    console.log('--- DISCONNECTED REASON --- ', reason);

    if (reason === 'io server disconnect') {
      return socket.disconnect();
    }
  });

  socket.on('charts', data => {
    // console.log('charts', data);
    dispatch({ type: Types.LOAD_CHART_DATASET_UPDATED, payload: data });
  });
}

export const socketDisconnect = (socket) => async (dispatch) => {
  if (socket) {
    console.log(socket);
    socket.disconnect();
  }
};

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
    const { checkboxes, periods } = await sdk.api.getChartsData();

    dispatch({ type: Types.LOAD_CHART_DATA_SUCCESS, payload: { periods: periods, checkboxes: checkboxes } });
  } catch (error) {
    dispatch({ type: Types.LOAD_CHART_DATA_ERROR, payload: error });
  } finally {
    dispatch({ type: Types.LOAD_CHART_DATA_FINISH });
  }
};

export const changeChartPeriod = ({ period, socket }) => async (dispatch) => {
  dispatch({ type: Types.TOGGLE_TIME_PERIOD, payload: period });

  dispatch({ type: Types.LOAD_CHART_DATASET_UPDATE });
  socket.emit('charts', { period });
}
