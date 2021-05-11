import Types from './types';
import { createReducer } from '../../sdk/helper';

import default_banner from '../../assets/banner_default.png';

const initialStore = {
  // app
  appLoading: true,
  appStatus: undefined,
  appError: undefined,
  // socket
  socketLoading: true,
  socket: null,
  socketError: undefined,

  // media query
  isMobile: false,
  isTablet: false,
  isDesktop: false,

  // modal
  modalShow: false,
  modalComponentPath: null,
  modalClassName: '',
  modalWithOverlay: true,
  closeCallback: () => {},

  // map
  pinLoading: true,
  pinList: [],
  pinError: undefined,

  // banner
  bannerLoading: false,
  banner: {
    link: '',
    linkPosition: 'left',
    linkName: '',
    src: default_banner,
    type: 'video',
    title: '',
    titlePosition: 'left',
    description: '',
    descriptionPosition: 'left',
  },
  bannerError: undefined,

  chartDataLoading: true,
  chartLoading: false,
  chart: {
    checkboxes: [],
    activeCheckbox: {
      value: '',
      label: '',
    },
    dataset: {},
    activePeriod: null,
    periods: [],
  },
  chartError: undefined,
};

const reducer = {
  // app
  [Types.APP_START]: draft => draft.appLoading = true,

  [Types.APP_SUCCESS]: (draft, payload) => {
    draft.appStatus = payload.status;
    draft.appError = undefined;
  },

  [Types.APP_ERROR]: (draft, payload) => draft.appError = payload,

  [Types.APP_FINISH]: draft => draft.appLoading = false,

  // socket
  [Types.SOCKET_CONNECTING_START]: draft => draft.socketLoading = true,

  [Types.SOCKET_CONNECTING_SUCCESS]: (draft, payload) => {
    draft.socket = payload;
    draft.socketError = undefined;
    draft.socketLoading = false;
  },

  [Types.SOCKET_CONNECTING_ERROR]: (draft, payload) => {
    draft.socketError = payload;
    draft.socketLoading = false;
  },

  // media query
  [Types.CHANGE_WINDOW_SIZE]: (draft, payload) => {
    if (payload >= 1024) {
      draft.isMobile = false;
      draft.isTablet = false;
      draft.isDesktop = true;
    } else if (payload >= 768) {
      draft.isMobile = false;
      draft.isTablet = true;
      draft.isDesktop = false;
    } else if (payload >= 280) {
      draft.isMobile = true;
      draft.isTablet = false;
      draft.isDesktop = false;
    } else {
      draft.isMobile = false;
      draft.isTablet = false;
      draft.isDesktop = false;
    }
  },

  // modal
  [Types.TOGGLE_MODAL]: (draft, { show, componentPath, className = '', withOverlay, closeCallback }) => {
    draft.modalShow = show;
    draft.modalComponentPath = componentPath;
    draft.modalClassName = className;
    draft.modalWithOverlay = withOverlay;
    draft.closeCallback = closeCallback;
  },

  // map
  [Types.LOAD_PIN_START]: draft => draft.pinLoading = true,

  [Types.LOAD_PIN_SUCCESS]: (draft, payload) => {
    draft.pinList = payload;
    draft.pinError = undefined;
  },

  [Types.LOAD_PIN_ERROR]: (draft, payload) => draft.pinError = payload,

  [Types.LOAD_PIN_FINISH]: draft => draft.pinLoading = false,

  // banner
  [Types.LOAD_BANNER_START]: draft => draft.bannerLoading = true,

  [Types.LOAD_BANNER_SUCCESS]: (draft, payload) => {
    draft.banner = {
      ...draft.banner,
      ...payload,
    };
    draft.bannerError = undefined;
  },

  [Types.LOAD_BANNER_ERROR]: (draft, payload) => draft.bannerError = payload,

  [Types.LOAD_BANNER_FINISH]: draft => draft.bannerLoading = false,

  // chart
  [Types.TOGGLE_TIME_PERIOD]: (draft, payload) => {
    draft.chart.activePeriod = payload;
    draft.chartLoading = true;
  },

  [Types.CHANGE_CHART]: (draft, payload) => draft.chart.activeCheckbox = payload,

  [Types.LOAD_CHART_DATA_START]: draft => draft.chartDataLoading = true,

  [Types.LOAD_CHART_DATA_SUCCESS]: (draft, { checkboxes, periods }) => {
    draft.chart.checkboxes = checkboxes;
    draft.chart.periods = periods;

    draft.chart.activeCheckbox = checkboxes[0];
    draft.chart.activePeriod = periods[0].value;

    draft.chartError = undefined;
  },

  [Types.LOAD_CHART_DATASET_UPDATE]: draft => draft.chart.dataset = {},

  [Types.LOAD_CHART_DATASET_UPDATED]: (draft, payload) => {
    const { symbol, chart, price, change, changeDirection } = payload;
    draft.chart.dataset[symbol] = { chart, price, change, changeDirection };
    if (draft.chartLoading) {
      draft.chartLoading = false;
    }
  },

  [Types.LOAD_CHART_DATA_ERROR]: (draft, payload) => draft.chartError = payload,

  [Types.LOAD_CHART_DATA_FINISH]: draft => draft.chartDataLoading = false,
};

export default createReducer(reducer, initialStore);
