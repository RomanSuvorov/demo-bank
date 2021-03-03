import React from 'react';

import { ExchangeBlock } from '../../components/Exchange/ExchangeBlock';
import { HowToBuy } from '../../components/HoToBuy';
import { FaqList } from '../../components/FaqList';

export function DesktopView({
  faq,
  faqLoading,
  faqError,
  review,
  reviewLoading,
  reviewError,
}) {
  return (
    <div className={"exchangeScreen_desktop"}>
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
