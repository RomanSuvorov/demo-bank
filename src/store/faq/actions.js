import Types from './types';

const faqMockList = [
  {
    value: '1',
    metaTags: ['Some', 'Некий', 'Деякий'],
    title: 'Некий',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae tempus purus, vitae egestas ' +
      'sapien. Nulla ac lorem ultrices, efficitur est varius, luctus tortor. Fusce ac nisl ipsum. Proin arcu neque, ' +
      'mattis at semper et, fringilla quis leo. Aenean molestie auctor leo at lacinia. Quisque tempus augue dolor, id ' +
      'tempus neque tincidunt at. Aliquam arcu nibh, dapibus eget maximus quis, interdum id libero. Orci varius natoque ' +
      'penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed vel dictum massa, ac tincidunt ipsum. ' +
      'Cras lacinia dolor lorem, ultricies tristique nulla pellentesque vel.\n' +
      'Duis varius tortor pretium ex rhoncus, eget sollicitudin risus venenatis. Donec aliquam ac mi molestie pulvinar.' +
      ' Proin venenatis pulvinar eros eget consectetur. Vestibulum viverra nibh ac justo mattis, sed tincidunt eni' +
      'm hendrerit. Fusce pretium ante non semper tristique. Aliquam venenatis congue lorem, a laoreet metus conva' +
      'llis vel. Aenean condimentum est non felis feugiat iaculis. In hac habitasse platea dictumst. Nullam non ma' +
      'gna ex. Aenean felis massa, vulputate a vestibulum sit amet, luctus sit amet nisl. Nulla non mollis ipsum. ' +
      'Quisque leo dolor, vehicula ornare malesuada nec, lacinia et eros. Integer ex orci, viverra id tortor pell' +
      'entesque, auctor ornare odio. Quisque ut leo commodo, fringilla turpis vitae, lobortis augue. Quisque feli' +
      's lacus, condimentum ut eros et, ultricies semper justo. Praesent commodo neque sed lobortis convallis.',
  },
  {
    value: '2',
    metaTags: ['Some', 'Деякий'],
    title: 'Некий',
    description: 'SOME another description for testing',
  },
];

const metaTagsMock = [
  'Some',
  'Некий',
  'Деякий',
  'ключевоеслово№1',
];

export const loadFaqData = () => async (dispatch) => {
  dispatch({ type: Types.LOAD_FAQ_START });

  try {
    // TODO: await from server;
    const faqArray = faqMockList;
    // TODO: await from server;
    const metaTags = metaTagsMock;

    dispatch({ type: Types.LOAD_FAQ_SUCCESS, payload: { faqArray, metaTags } })
  } catch (e) {
    dispatch({ type: Types.LOAD_FAQ_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.LOAD_FAQ_FINISH });
  }
}

export const loadFaqByAmount = (count = 1) => async (dispatch) => {
  dispatch({ type: Types.LOAD_FAQ_START });

  try {
    // TODO: await from server;
    const faqArray = [faqMockList[0], faqMockList[1]];

    dispatch({ type: Types.LOAD_FAQ_SUCCESS, payload: { faqArray } })
  } catch (e) {
    dispatch({ type: Types.LOAD_FAQ_ERROR, payload: e });
  } finally {
    dispatch({ type: Types.LOAD_FAQ_FINISH });
  }
}
