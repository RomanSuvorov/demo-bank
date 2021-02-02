import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ExchangeBlock } from '../../components/Exchange';
import Types from '../../store/exchange/types';
import './ExchangeScreen.css';

function ExchangeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: Types.LOAD_DATA });
  }, []);

  return (
    <div className={"exchangeScreen"}>
      <ExchangeBlock />
    </div>
  );
}

export { ExchangeScreen };
