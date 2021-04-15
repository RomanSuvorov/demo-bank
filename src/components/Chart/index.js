import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import { Loading } from '../Loading';
import { ErrorBlock } from '../ErrorBlock';
import { TooltipChart } from '../TooltipChart';
import { changeChartPeriod } from '../../store/app/actions';
import { color } from '../../constants';
import './index.css';

function Tick({ mode, period, payload, x, y, textAnchor, width, height, orientation, stroke, dy, type, className }) {
  let value = '';

  switch (mode) {
    case 'time':
      const formatter = (string) => {
        if (string.length === 1) string = `0${string}`;
        return string;
      };

      const date = new Date(payload.value);
      const MM = formatter(String(date.getMonth() + 1));
      const dd = formatter(String(date.getDate()));

      // with hours displaying
      if (period === '1h' || period === '1m') {
        const hh = formatter(String(date.getHours()));

        // with minutes displaying
        if (period === '1m') {
          const mm = formatter(String(date.getMinutes()));

          value = `${MM}/${dd} ${hh}:${mm} `;
          break;
        }

        value = `${MM}/${dd} ${hh}h`;
        break;
      }

      value = `${MM}/${dd}`;
      break;
    case 'value':
    default:
      value = payload.value;
      break;
  }

  return (
    <text
      type={type}
      stroke={stroke}
      orientation={orientation}
      width={width}
      height={height}
      x={x}
      y={y}
      textAnchor={textAnchor}
      fill={color.colorSecondaryText}
      className={className}
    >
      <tspan x={x} dy={mode === 'time' ? "0.8em" : "0.355em"}>
        {value}
      </tspan>
    </text>
  );
}

export function CryptoChart() {
  const { chartLoading, chart, chartError, socket } = useSelector(state => state.app);
  const { activeCheckbox, dataset, periods, activePeriod } = chart;
  const [cryptoStr = "", usdtStr = ""] = activeCheckbox.label.split('/');
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();

  const handleSetTimePeriod = (e) => {
    const { periodvalue } = e.currentTarget.dataset;
    if (!periodvalue || periodvalue === activePeriod) return;

    dispatch(changeChartPeriod({ period: periodvalue, socket }));
  };

  const dataLoading = chartLoading
    || !dataset[activeCheckbox.value]
    || !dataset[activeCheckbox.value].chart
    || !dataset[activeCheckbox.value].chart.length > 0;

  if (chartError) {
    return (
      <div className={"cryptoChart"}>
        <ErrorBlock error={`Chart Data "${chartError}"`} />
      </div>
    );
  }

  if (dataLoading) {
    return (
      <div className={"cryptoChart"}>
        <div className={"cryptoChart_load"}>
          <Loading text={"Load Chart Data"} withDots={true} />
        </div>
      </div>
    );
  }

  return (
    <div className={"cryptoChart"}>

      <div className={"cryptoChart_info"}>
        <div className={"cryptoChart_value"}>
          <span>{cryptoStr.trim()}</span>
          <span>&nbsp;/&nbsp;</span>
          <span>{usdtStr.trim()}</span>

          <div className={"cryptoChart_mockCheckbox"} />
        </div>

        <div className={"cryptoChart_times"}>
          {
            periods.map(period => (
              <div
                key={period.value}
                data-periodvalue={period.value}
                className={`cryptoChart_times__item ${activePeriod === period.value ? 'active' : ''}`}
                onClick={handleSetTimePeriod}
              >
                <span>{period.label}</span>
              </div>
            ))
          }
        </div>
      </div>

      <div className={`cryptoChart_price ${dataset[activeCheckbox.value] ? '' : 'load'}`}>
          <span className={"cryptoChart_price--price"}>
            {dataset[activeCheckbox.value] ? dataset[activeCheckbox.value].price : ''}
          </span>
        <span className={`cryptoChart_price--percent ${dataset[activeCheckbox.value] ? dataset[activeCheckbox.value].changeDirection : ''}`}>
            {dataset[activeCheckbox.value] ? dataset[activeCheckbox.value].change : ''}
          </span>
      </div>

      <ResponsiveContainer
        width={"100%"}
        height={200}
        className={"cryptoChart_chart"}
      >
        {
          dataLoading ? (
            <Loading />
          ) : (
            <AreaChart data={dataset[activeCheckbox.value].chart}>
              <defs>
                <linearGradient id={"value"} x1={0} x2={0} y1={0} y2={1}>
                  <stop offset="35%" stopColor={"rgb(246, 165, 8)"} stopOpacity={0.5}/>
                  <stop offset="85%" stopColor={"rgb(246, 137, 8)"} stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="0"
                vertical={false}
                stroke={color.colorBackgroundLight}
              />
              <XAxis
                axisLine={false}
                tickLine={false}
                stroke={color.colorSecondaryText}
                dataKey="time"
                tick={props => <Tick mode={"time"} period={activePeriod} {...props} />}
                interval={"preserveStart"}
                tickMargin={6}
              />
              <YAxis
                padding={{ top: 6 }}
                axisLine={false}
                tickLine={false}
                stroke={color.colorSecondaryText}
                tick={props => <Tick mode={"value"} {...props} />}
                orientation={"right"}
                tickMargin={6}
                domain={['dataMin', 'dataMax']}
              />
              <Area
                type="linear"
                dataKey="value"
                stroke={color.colorActive}
                strokeWidth={2}
                fill="url(#value)"
                fillOpacity={1}
                animationDuration={800}
              />
              <Tooltip content={<TooltipChart />} />
            </AreaChart>
          )
        }
      </ResponsiveContainer>
    </div>
  );
}
