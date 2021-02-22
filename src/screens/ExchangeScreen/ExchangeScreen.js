import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ExchangeBlock } from '../../components/Exchange';
import { loadExchangeData } from '../../store/exchange/actions';
import { loadFaqByAmount } from '../../store/faq/actions';
import './ExchangeScreen.css';

function ExchangeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadExchangeData());
    dispatch(loadFaqByAmount(1));
  }, []);

  return (
    <div className={"exchangeScreen"}>
      <ExchangeBlock />
    </div>
  );
}

export { ExchangeScreen };
