import React from 'react';

import { ExchangeBlock } from '../../components/Exchange/ExchangeBlock';
import { HowToBuy } from '../../components/HoToBuy';
import { ReviewBlock } from '../../components/ReviewBlock';
import { FaqList } from '../../components/FaqList';
import { Map } from '../../components/Map';
import { Banner } from '../../components/Banner';
import { ChartSwitcher } from '../../components/ChartSwitcher';
import { CryptoChart } from '../../components/Chart';

export function DesktopView() {
  return (
    <div className={"exchangeScreen_desktop"}>
      {/*<ExchangeBlock />*/}
      <ChartSwitcher />
      <CryptoChart />
      {/*<Banner />*/}
      {/*<HowToBuy />*/}
      {/*<Map />*/}
      {/*<ReviewBlock />*/}
      {/*<FaqList />*/}
    </div>
  );
}
