import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Exchange.ThirdStep.css';

function ThirdStep() {
  const {
    loading,
    error,
  } = useSelector(state => state.exchange);
  const dispatch = useDispatch();

  return (
    <div>ThirdStep</div>
  );
}

export { ThirdStep };
