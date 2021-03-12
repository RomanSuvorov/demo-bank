import Types from './types';

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