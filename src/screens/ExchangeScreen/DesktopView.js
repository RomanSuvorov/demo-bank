import React from 'react';

import { ExchangeBlock } from '../../components/Exchange/ExchangeBlock';
import { Map } from '../../components/Map';
import { ReviewBlock } from '../../components/ReviewBlock';
import { Banner } from '../../components/Banner';
import { CryptoChart } from '../../components/Chart';
import { HowToBuy } from '../../components/HoToBuy';
import { FaqList } from '../../components/FaqList';
import { ChartSwitcher } from '../../components/ChartSwitcher';

export function DesktopView() {
  return (
    <div className={"exchangeScreen_desktop"}>
      <div className={"exchangeScreen_desktop__column left"}>
        <ExchangeBlock />
        <Map />
        <ReviewBlock />
      </div>
      <div className={"exchangeScreen_desktop__column center"}>
        <Banner />
        <CryptoChart />
        <HowToBuy />
        <FaqList />
      </div>
      <div className={"exchangeScreen_desktop__column right"}>
        <ChartSwitcher />
      </div>
    </div>
  );
}
