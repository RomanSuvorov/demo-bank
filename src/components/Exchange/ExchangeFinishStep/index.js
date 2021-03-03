import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { exchangeStream } from '../../../constants';
import ExchangeTypes from '../../../store/exchange/types';
import './index.css';

export function FinishStep() {
  const { streamExchange, showFinishStep } = useSelector(state => state.exchange);
  const dispatch = useDispatch();
  const { t } = useTranslation('exchange');
  const title = 'Заявка обработана!';
  let description = '';

  switch (streamExchange) {
    case exchangeStream.SELL_BY_CARD:
      description = 'Перевод безналичных средств отправлен на вашу банковскую карту.';
      break;
    case exchangeStream.SELL_BY_CASH:
      description = 'Криптовалюта поступила на адрес кошелька DEMO BANK. Мы свяжемся с вами через несколько минут,' +
        ' чтобы согласовать удобную для вас точку получения наличных средств.';
      break;
    case exchangeStream.BUY_BY_CARD:
      description = 'Перевод выбранной криптовалюты отправлен на адрес вашего кошелька.';
      break;
    case exchangeStream.BUY_BY_CASH:
      description = 'Мы свяжемся с вами через несколько минут.';
      break;
    default:
      description = '';
  }

  const handleReset = () => dispatch({ type: ExchangeTypes.RESET_EXCHANGE });

  return (
    <div className={`finishStep ${showFinishStep ? 'show' : ''}`}>
      <div className={"finishStep_info"}>
        <div className={"finishStep_info__title"}>
          <span>{title}</span>
        </div>
        <div className={"finishStep_info__description"}>
          <span>{description}</span>
        </div>
      </div>
      <div className={"finishStep_navigation"}>
        <span onClick={handleReset}>Вернуться к обмену</span>
      </div>
    </div>
  );
}
