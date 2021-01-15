import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import { Layout } from './delegate';

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
