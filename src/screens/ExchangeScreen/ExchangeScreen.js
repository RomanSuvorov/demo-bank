import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Exchange } from '../../components';
import { loadExchangeData } from '../../store/exchange/actions';
import { loadFaqByAmount } from '../../store/faq/actions';
import { loadReviewByAmount } from '../../store/review/actions';
import './ExchangeScreen.css';

function ExchangeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadExchangeData());
    dispatch(loadFaqByAmount(4));
    dispatch(loadReviewByAmount(12));
  }, []);

  return (
    <div className={"exchangeScreen"}>
      <Exchange />
    </div>
  );
}

export { ExchangeScreen };
