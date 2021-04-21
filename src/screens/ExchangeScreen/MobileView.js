import React from 'react';

import { ExchangeBlock } from '../../components/Exchange/ExchangeBlock';
import { HowToBuy } from '../../components/HoToBuy';
import { CryptoChart } from '../../components/Chart';
import { ChartSwitcher } from '../../components/ChartSwitcher';
import { Map } from '../../components/Map';
import { Banner } from '../../components/Banner';
import { ReviewBlock } from '../../components/ReviewBlock';
import { FaqList } from '../../components/FaqList';

export function MobileView() {
  return (
    <div className={"exchangeScreen_mobile"}>
      <ExchangeBlock />
      <HowToBuy />
      <CryptoChart />
      <ChartSwitcher />
      <Map />
      <Banner />
      <ReviewBlock />
      <FaqList />
    </div>
  );
}
