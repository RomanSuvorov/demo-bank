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
  const {
    isMobile,
    isTablet,
    isDesktop,
  } = useSelector(state => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(loadExchangeData());
    // dispatch(loadBannerData());
    dispatch(loadFaqByAmount(4));
    dispatch(loadReviewByAmount(2));
    // dispatch(loadChartData());
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
