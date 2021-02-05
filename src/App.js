import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { _saveState, createReduxStore } from './sdk/helper';
import reducers from './store';
import './App.css';

import { Layout } from './delegate';

const store = createReduxStore(reducers);

// store.subscribe(() => {
//   _saveState(store.getState());
// });

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  );
}

export default App;
