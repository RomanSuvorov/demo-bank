import React from 'react';

import { ExchangeBlock } from '../../components/Exchange/ExchangeBlock';
import { HowToBuy } from '../../components/HoToBuy';
import { Slider } from '../../components/Slider';
import { Review } from '../../components/Review';
import { FaqList } from '../../components/FaqList';
import { Map } from '../../components/Map';

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
      <Map />
      <Slider
        className={"exchangeScreen_desktop__slider"}
        slides={review}
        renderComponent={({ item, key }) => <Review item={item} key={key} />}
      />
      <FaqList
        array={faq}
        loading={faqLoading}
        error={faqError}
      />
    </div>
  );
}
