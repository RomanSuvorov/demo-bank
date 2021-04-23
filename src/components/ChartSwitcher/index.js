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
  const chartDataLoading = useSelector(state => state.app.chartDataLoading);
  const chartLoading = useSelector(state => state.app.chartLoading);
  const { checkboxes, activeCheckbox, dataset } = useSelector(state => state.app.chart);
  const chartError = useSelector(state => state.app.chartError);
  const dispatch = useDispatch();

  const handleChooseCheckbox = (item) => {
    dispatch({ type: AppTypes.CHANGE_CHART, payload: item });
  };

  if (chartDataLoading) {
    return (
      <div className={"chartSwitcher"}>
        <Loading text={"Load Switcher Charts Data"} withDots={true} block={true} />
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

  return (
    <div className={"chartSwitcher"}>
      {
        checkboxes.map(item => {
          const [cryptoStr = "", usdtStr = ""] = item.label.split('/');
          const chartUpdating = chartLoading || !dataset[item.value] || !dataset[item.value].chart || !dataset[item.value].chart.length > 0;

          return (
            <div
              key={item.value}
              className={`chartSwitcher_checkbox ${activeCheckbox.value === item.value ? 'active' : ''}`}
              onClick={() => handleChooseCheckbox(item)}
            >
              <div className={"chartSwitcher_checkbox__currency"}>
                  <div className={"chartSwitcher_checkbox_value"}>
                    <span>{cryptoStr.trim()}</span>
                    <span>&nbsp;/&nbsp;</span>
                    <span>{usdtStr.trim()}</span>
                  </div>

                  <div className={"chartSwitcher_checkbox_checkbox"} />
                </div>

              <div className={`chartSwitcher_checkbox__content ${activeCheckbox.value === item.value ? 'active' : ''}`}>
                <div className={`chartSwitcher_checkbox__priceInfo ${dataset[item.value] ? '' : 'load'}`}>
                      <span className={"chartSwitcher_checkbox__priceInfo--price"}>
                        {dataset[item.value] ? dataset[item.value].price : ''}
                      </span>
                  <span
                    className={`chartSwitcher_checkbox__priceInfo--percent ${dataset[item.value] ? dataset[item.value].changeDirection : ''}`}>
                        {
                          dataset[item.value] ?
                            `${dataset[item.value].changeDirection === 'positive' ? `+${dataset[item.value].change}` : dataset[item.value].change}`
                            : ''
                        }
                      </span>
                </div>
                <div className={`chartSwitcher_checkbox_chartWrapper ${activeCheckbox.value === item.value ? 'active' : ''}`}>
                  {
                    activeCheckbox.value === item.value && (
                      chartUpdating ? (
                        <Loading text={"Updating chart"} withDots={true} />
                      ) : (
                        <ResponsiveContainer
                          width={"100%"}
                          height={60}
                          className={"chartSwitcher_checkbox_chart"}
                        >

                          <AreaChart data={dataset[item.value].chart}>
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke={color.colorActive}
                              strokeWidth={2}
                              fill="url(#value)"
                              fillOpacity={1}
                              animationBegin={300}
                              animationDuration={800}
                            />
                            <YAxis
                              hide={true}
                              domain={['dataMin', 'dataMax']}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      )
                    )
                  }
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  )
}
