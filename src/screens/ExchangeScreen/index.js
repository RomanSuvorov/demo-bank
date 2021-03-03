import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadExchangeData } from '../../store/exchange/actions';
import { loadFaqByAmount } from '../../store/faq/actions';
import { loadReviewByAmount } from '../../store/review/actions';
import { DesktopView } from './DesktopView';
import { TabletView } from './TabletView';
import { MobileView } from './MobileView';
import './index.css';

export function ExchangeScreen() {
  const { isMobile, isTablet, isDesktop } = useSelector(state => state.app);
  const { faqArray, loading: faqLoading, error: faqError } = useSelector(state => state.faq);
  const { reviewArray, loading: reviewLoading, error: reviewError } = useSelector(state => state.review);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadExchangeData());
    dispatch(loadFaqByAmount(4));
    dispatch(loadReviewByAmount(12));
  }, []);

  const getExchangeScreenByPort = () => {
    let Component = MobileView;
    const componentProps = {
      faq: faqArray,
      faqLoading,
      faqError,
      review: reviewArray,
      reviewLoading,
      reviewError,
    };

    if (isDesktop) {
      Component = DesktopView;
    } else if (isTablet) {
      Component = TabletView;
    } else if (isMobile) {
      Component = MobileView;
    }

    return <Component {...componentProps} />
  };

  return (
    <div className={"exchangeScreen"}>
      {getExchangeScreenByPort()}
    </div>
  );
}
