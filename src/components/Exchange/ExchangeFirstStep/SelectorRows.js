import React from 'react';

import { cnst } from '../../../constants';
import { Select } from '../..';
import './Exchange.FirstStep.css';

function SelectorsRow({
  direction,
  giveSelected,
  getSelected,
  methodList,
  cryptoList,
  chooseGiveOption,
  chooseGetOption,
}) {
  let workObject = {}, keys = [], conditionKeys = [];

  if (direction === cnst.CRYPTO_GIVE) {
    workObject = cryptoList;
    keys = Object.keys(cryptoList);
    conditionKeys = Object.keys(methodList);
  } else if (direction === cnst.CRYPTO_GET) {
    workObject = methodList;
    keys = Object.keys(methodList);
    conditionKeys = Object.keys(cryptoList);
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

    if (workObject[giveSelected] && workObject[giveSelected].method) {
      options = conditionKeys.reduce((result, condKey) => {
        if (
          workObject[giveSelected].method[condKey]
          && typeof workObject[giveSelected].method[condKey] === 'object'
          && workObject[giveSelected].method[condKey].list
          && workObject[giveSelected].method[condKey].list.length > 0
        ) {
          result.push(workObject[giveSelected].method[condKey]);
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
        value={giveSelected}
        options={getFirstSelect()}
        onChange={chooseGiveOption}
      />
      <div className={"firstStep_row__center"} />
      <Select
        className={"firstStep_row__right"}
        value={getSelected}
        options={getSecondSelect()}
        onChange={chooseGetOption}
      />
    </div>
  );
}

export { SelectorsRow };
