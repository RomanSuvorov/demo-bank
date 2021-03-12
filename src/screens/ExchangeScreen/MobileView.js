import React from 'react';

import { ExchangeBlock } from '../../components/Exchange/ExchangeBlock';
import { HowToBuy } from '../../components/HoToBuy';
import { ReviewBlock } from '../../components/ReviewBlock';
import { FaqList } from '../../components/FaqList';
import { Map } from '../../components/Map';
import { Banner } from '../../components/Banner';

export function MobileView() {
  return (
    <div className={"exchangeScreen_mobile"}>
      <ExchangeBlock />
      <Banner />
      <HowToBuy />
      <Map />
      <ReviewBlock />
      <FaqList />
    </div>
  );
}
