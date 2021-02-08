import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ExchangeBlock } from '../../components/Exchange';
import { loadInitialData } from '../../store/exchange/actions';
import './ExchangeScreen.css';

function ExchangeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitialData());
  }, []);

  return (
    <div className={"exchangeScreen"}>
      <ExchangeBlock />
    </div>
  );
}

export { ExchangeScreen };
