import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useClipboard from "react-use-clipboard";

import { Tooltip } from '../..';
import { HelpSign } from '../..';
import { Input } from '../..';
import { LoaderBall } from '../..';
import { Button } from '../..';
import { CopyIcon, ErrorIcon, SuccessIcon } from '../../../constants/icons';
import { exchangeStream, transactionProcess } from '../../../constants';
import ExchangeTypes from '../../../store/exchange/types';
import { preventSendingByUser } from '../../../store/exchange/actions';
import './Exchange.ThirdStep.css';

function ThirdStep() {
  const {
    loading,
    error,
    streamExchange,
    transactionData,
    transactionStatus,
  } = useSelector(state => state.exchange);
  const { isMobile } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const [timeLeft, setTimeLeft] = useState(60 * 30);
  useEffect(() => {
    let timer, timeout;

    const _startTimer = () => {
      timer = setInterval(() => {
        if (timeLeft === 0) {
          clearInterval(timer);
          dispatch({ type: ExchangeTypes.CHANGE_TRANSACTION_STATUS, payload: transactionProcess.CANCELED });
          return;
        }
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    };

    switch (transactionStatus) {
      case transactionProcess.AWAITING:
        console.log('1', timeLeft);
        _startTimer();
        break;
      case transactionProcess.SUCCESSFUL:
        clearInterval(timer);
        timeout = setTimeout(() => {
          dispatch({ type: ExchangeTypes.NEXT_STEP });
          dispatch({ type: ExchangeTypes.THROW_TO_DEFAULT });
        }, 3000);
        break;
      case transactionProcess.CANCELED:
        clearInterval(timer);
        break;
    }

    return () => {
      clearInterval(timer);
      clearInterval(timeout);
    }
  }, [transactionStatus, timeLeft]);

  const [title, setTitle] = useState('');
  const [tooltipText, setTooltipText] = useState('');
  const [inputLabel, setInputLabel] = useState('');
  const [inputValue = '', setInputValue] = useState(transactionData);
  useEffect(() => {
    if ((streamExchange === exchangeStream.SELL_BY_CARD) || (streamExchange === exchangeStream.SELL_BY_CASH)) {
      setTitle('Переведите криптовалюту на адрес кошелька системы');
      setTooltipText('Чтобы продать криптовалюту и получить безналичные средства на вашу банковскую карту,' +
        ' переведите криптовалюту на адрес кошелька системы. Безналичные средства будут зачислены на ваш счёт ' +
        'автоматически, как только на адрес кошелька DEMO BANK поступит перевод криптовалюты.');
      setInputLabel('Адрес кошелька системы');
      setInputValue(transactionData);
    } else if (streamExchange === exchangeStream.BUY_BY_CARD) {
      setTitle('Переведите безналичные средства на банковскую карту системы');
      setTooltipText('Чтобы купить выбранную криптовалюту за безналичные средства, переведите безналичные средства на " +\n' +
        '        "банковскую карту системы. Криптовалюта будет зачислена на ваш кошелек автоматически, как только на счет " +\n' +
        '        "DEMO BANK поступит перевод безналичных средств.');
      setInputLabel('Банковская карта системы');
      setInputValue(transactionData);
    }
  }, [streamExchange, transactionData]);
  const [isCopied, setCopied] = useClipboard(inputValue);

  const handleCopySystemData = () => setCopied();

  const handleGoBack = async () => {
    await dispatch(preventSendingByUser());
    dispatch({ type: ExchangeTypes.PREVIOUS_STEP });
  };

  const getProcessBlock = () => {
    let title = '', Component = <div />;

    switch (transactionStatus) {
      case transactionProcess.AWAITING:
        Component = <LoaderBall />;
        title = 'Ожидает подтверждения';
        break;
      case transactionProcess.SUCCESSFUL:
        Component = (<div className={"thirdStep_successfulBox"}>
          <SuccessIcon />
        </div>);
        title = 'Подтверждено';
        break;
      case transactionProcess.CANCELED:
        Component = (<div className={"thirdStep_canceledBox"}>
          <ErrorIcon />
        </div>);
        title = 'Не подтверждено';
        break;
    }

    return (
      <div className={"thirdStep_transaction"}>
        <div className={"thirdStep_transaction__title"}>
          <span>Статус транзакции:</span>
        </div>
        <div className={"thirdStep_transaction__process"}>
          <div className="thirdStep_process__icon">
            {Component}
          </div>
          <div className={"thirdStep_process__title"}>
            <span>{title}</span>
          </div>
          {
            (transactionStatus === transactionProcess.AWAITING) && (
              <div className={"thirdStep_process__subtitle"}>
                <span>Время ожидания:&nbsp;</span>
                <span className={"thirdStep_process__timeLeft"}>
                  {parseInt((timeLeft / 60) % 60, 10)}
                  &nbsp;min
                </span>
              </div>
            )
          }
        </div>
      </div>
    )
  };

  return (
    <div className={"thirdStep"}>
      <div className={"thirdStep_title"}>
        <span>{title}</span>
        <Tooltip
          className={"thirdStep_tooltip"}
          title={tooltipText}
          trigger={isMobile ? 'touch' : 'click'}
        >
          <HelpSign className={"thirdStep__help"} />
        </Tooltip>
      </div>

      <Input
        className={`thirdStep_input ${isCopied ? 'copied' : ''}`}
        label={<span>{inputLabel}</span>}
        name={"systemData"}
        value={inputValue}
        readOnly={true}
        Icon={CopyIcon}
        iconHandler={handleCopySystemData}
      />
      {getProcessBlock()}

      <div className="thirdStep_fixPrice">
        <span>
          *Курс фиксируется в момент поступления средств на адрес кошелька
        </span>
      </div>

      {
        (transactionStatus !== transactionProcess.SUCCESSFUL) && (
          <div className={"thirdStep_buttonBox"}>
            <Button
              className={"thirdStep_button"}
              onClick={handleGoBack}
            >
              Отмена
            </Button>
          </div>
        )
      }
    </div>
  );
}

export { ThirdStep };
