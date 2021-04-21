import React from 'react';

import { ExchangeBlock } from '../../components/Exchange/ExchangeBlock';
import { Map } from '../../components/Map';
import { ReviewBlock } from '../../components/ReviewBlock';
import { Banner } from '../../components/Banner';
import { CryptoChart } from '../../components/Chart';
import { ChartSwitcher } from '../../components/ChartSwitcher';
import { HowToBuy } from '../../components/HoToBuy';
import { FaqList } from '../../components/FaqList';

export function TabletView() {
  return (
    <div className={"exchangeScreen_tablet"}>
      <div className={"exchangeScreen_tablet__column left"}>
        <ExchangeBlock />
        <HowToBuy />
        <Map />
        <ReviewBlock />
      </div>
      <div className={"exchangeScreen_tablet__column right"}>
        <Banner />
        <CryptoChart />
        <ChartSwitcher />
        <FaqList />
      </div>
    </div>
  );
}
