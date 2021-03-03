import React from 'react';

import { ExchangeBlock } from '../../components/Exchange/ExchangeBlock';
import { HowToBuy } from '../../components/HoToBuy';
import { FaqList } from '../../components/FaqList';

export function TabletView({
  faq,
  faqLoading,
  faqError,
  review,
  reviewLoading,
  reviewError,
}) {
  return (
    <div className={"exchangeScreen_tablet"}>
      <ExchangeBlock />
      <HowToBuy />
      <FaqList
        array={faq}
        loading={faqLoading}
        error={faqError}
      />
    </div>
  );
}
