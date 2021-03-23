import React from 'react';

import { ExchangeBlock } from '../../components/Exchange/ExchangeBlock';
import { HowToBuy } from '../../components/HoToBuy';
import { ReviewBlock } from '../../components/ReviewBlock';
import { FaqList } from '../../components/FaqList';
import { Map } from '../../components/Map';
import { Banner } from '../../components/Banner';
import { CryptoChart } from '../../components/Chart';
import { ChartSwitcher } from '../../components/ChartSwitcher';

export function TabletView() {
  return (
    <div className={"exchangeScreen_tablet"}>
      <ExchangeBlock />
      <ChartSwitcher />
      <CryptoChart />
      <Banner />
      <Map />
      <HowToBuy />
      <ReviewBlock />
      <FaqList />
    </div>
  );
}
