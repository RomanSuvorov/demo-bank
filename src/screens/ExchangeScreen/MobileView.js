import React from 'react';

import { ExchangeBlock } from '../../components/Exchange/ExchangeBlock';
import { HowToBuy } from '../../components/HoToBuy';
import { Slider } from '../../components/Slider';
import { Review } from '../../components/Review';
import { FaqList } from '../../components/FaqList';
import { Map } from '../../components/Map';

export function MobileView({
  faq,
  faqLoading,
  faqError,
  review,
  reviewLoading,
  reviewError,
}) {
  return (
    <div className={"exchangeScreen_mobile"}>
      <ExchangeBlock />
      <HowToBuy />
      <Map />
      <Slider
        className={"exchangeScreen_mobile__slider"}
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
