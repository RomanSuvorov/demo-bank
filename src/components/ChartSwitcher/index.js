import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  YAxis,
} from 'recharts';

import { Loading } from '../Loading';
import { ErrorBlock } from '../ErrorBlock';
import AppTypes from '../../store/app/types';
import { color } from '../../constants';
import './index.css';

export function ChartSwitcher() {
  const {
    chartLoading,
    chart,
    chartError,
  } = useSelector(state => state.app);
  const { checkboxes, activeCheckbox, dataset } = chart;
  const dispatch = useDispatch();

  const handleChooseCheckbox = (item) => {
    dispatch({ type: AppTypes.CHANGE_CHART, payload: item });
  };

  if (chartLoading) {
    return (
      <div className={"chartSwitcher"}>
        <div className={"chartSwitcher_load"}>
          <Loading text={"Load Switcher Charts Data"} withDots={true} />
        </div>
      </div>
    );
  }

  if (chartError) {
    return (
      <div className={"chartSwitcher"}>
        <ErrorBlock error={`Chart Switcher "${chartError}"`} />
      </div>
    )
  }

  const dataLoading = (value) => chartLoading || !dataset[value] || !dataset[value].chart || !dataset[value].chart.length > 0;

  const getHeightOfChart = (value) => {
    if (activeCheckbox.value === value) {
      return 60;
    } else {
      return 1;
    }
  };

  return (
    <div className={"chartSwitcher"}>
      {
        checkboxes.map(item => {
          const [cryptoStr = "", usdtStr = ""] = item.label.split('/');

          return (
            <div
              key={item.value}
              className={`chartSwitcher_checkbox ${activeCheckbox.value === item.value ? 'active' : ''}`}
              onClick={() => handleChooseCheckbox(item)}
            >
              <div className={"chartSwitcher_checkbox__header"}>
                <div className={"chartSwitcher_checkbox__currency"}>
                  <div className={"chartSwitcher_checkbox_value"}>
                    <span>{cryptoStr.trim()}</span>
                    <span>&nbsp;/&nbsp;</span>
                    <span>{usdtStr.trim()}</span>
                  </div>

                  <div className={"chartSwitcher_checkbox_checkbox"} />
                </div>

                <div className={`chartSwitcher_checkbox__priceInfo ${dataset[item.value] ? '' : 'load'}`}>
                  <span className={"chartSwitcher_checkbox__priceInfo--price"}>
                    {dataset[item.value] ? dataset[item.value].price : ''}
                  </span>
                  <span className={`chartSwitcher_checkbox__priceInfo--percent ${dataset[item.value] ? dataset[item.value].changeDirection : ''}`}>
                    {dataset[item.value] ? dataset[item.value].change : ''}
                  </span>
                </div>
              </div>

              <ResponsiveContainer
                width={"100%"}
                height={getHeightOfChart(item.value)}
                className={"chartSwitcher_checkbox_chart"}
              >
                {
                  dataLoading(item.value) ? (
                    <Loading />
                  ) : (
                    <AreaChart data={dataset[item.value].chart}>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color.colorActive}
                        strokeWidth={2}
                        fill="url(#value)"
                        fillOpacity={1}
                        animationDuration={800}
                      />
                      <YAxis
                        hide={true}
                        domain={['dataMin', 'dataMax']}
                      />
                    </AreaChart>
                  )
                }
              </ResponsiveContainer>
            </div>
          );
        })
      }
    </div>
  )
}
