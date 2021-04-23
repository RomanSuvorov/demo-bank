import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadExchangeData } from '../../store/exchange/actions';
import { loadFaqByAmount } from '../../store/faq/actions';
import { loadReviewByAmount } from '../../store/review/actions';
import { loadBannerData, loadChartData } from '../../store/app/actions';
import { DesktopView } from './DesktopView';
import { TabletView } from './TabletView';
import { MobileView } from './MobileView';
import './index.css';

export function ExchangeScreen() {
  const isMobile = useSelector(state => state.app.isMobile);
  const isTablet = useSelector(state => state.app.isTablet);
  const isDesktop = useSelector(state => state.app.isDesktop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadExchangeData());
    dispatch(loadBannerData());
    dispatch(loadFaqByAmount(3));
    dispatch(loadReviewByAmount(3));
    dispatch(loadChartData());
  }, []);

  const getExchangeScreenByPort = () => {
    let Component = MobileView;

    if (isDesktop) {
      Component = DesktopView;
    } else if (isTablet) {
      Component = TabletView;
    } else if (isMobile) {
      Component = MobileView;
    }

    return <Component />
  };

  return (
    <div className={"exchangeScreen"}>
      {getExchangeScreenByPort()}
    </div>
  );
}
