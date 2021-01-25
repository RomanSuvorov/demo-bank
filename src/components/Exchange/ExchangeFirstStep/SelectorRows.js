import React, { useState } from 'react';

import { cnst, exchangeCryptoOpts, exchangeMethodOpts } from '../../../constants';
import { Select } from '../..';
import './Exchange.FirstStep.css';

function SelectorsRow() {
  const [firstSelect, changeFirstSelect] = useState('btc');
  const [secondSelect, changeSecondSelect] = useState('btc');

  const DIRECTION = cnst.CRYPTO_GIVE;
  let workObject = {}, keys = [], conditionKeys = [];

  if (DIRECTION === cnst.CRYPTO_GIVE) {
    workObject = exchangeCryptoOpts;
    keys = Object.keys(exchangeCryptoOpts);
    conditionKeys = Object.keys(exchangeMethodOpts);
  } else if (DIRECTION === cnst.CRYPTO_GET) {
    workObject = exchangeMethodOpts;
    keys = Object.keys(exchangeMethodOpts);
    conditionKeys = Object.keys(exchangeCryptoOpts);
  }

  const getFirstSelect = () => {
    let options = [];

    keys.forEach(key => {
      let result = false;

      if (workObject[key].method && typeof workObject[key].method === 'object') {
        result = conditionKeys.some(condKey => {
          return !!(
            workObject[key].method[condKey]
            && workObject[key].method[condKey].list
            && workObject[key].method[condKey].list.length > 0
          );
        });
      }

      if (result) options.push(workObject[key]);
    });

    return options;
  };

  const getSecondSelect = () => {
    let options = [];

    if (workObject[firstSelect] && workObject[firstSelect].method) {
      options = conditionKeys.reduce((result, condKey) => {
        if (
          workObject[firstSelect].method[condKey]
          && typeof workObject[firstSelect].method[condKey] === 'object'
          && workObject[firstSelect].method[condKey].list
          && workObject[firstSelect].method[condKey].list.length > 0
        ) {
          result.push(workObject[firstSelect].method[condKey]);
        }

        return result;
      }, []);
    }

    return options;
  };

  return (
    <div className={"firstStep_row select"}>
      <Select
        className={"firstStep_row__left"}
        value={firstSelect}
        options={getFirstSelect()}
        onChange={changeFirstSelect}
      />
      <div className={"firstStep_row__center"} />
      <Select
        className={"firstStep_row__right"}
        options={getSecondSelect()}
        onChange={changeSecondSelect}
      />
    </div>
  );
}

export { SelectorsRow };
