class DemobankSDK {
  constructor(params) {
    this.config = {
      demobankApi: params.demobankApi,
    };

    this.urls = {
      // status
      GET_STATUS_API: `${this.config.demobankApi}/status`,
      // exchange
      GET_COUNTRY_INDEXES: `${this.config.demobankApi}/countryIndexes`,
      GET_CURRENCIES: `${this.config.demobankApi}/currencies`,
      GET_PRICE: `${this.config.demobankApi}/price`,
      CREATE_REQUEST: `${this.config.demobankApi}/exchangeRequestCreate`,
      CANCEL_REQUEST: `${this.config.demobankApi}/exchangeRequestCancel/`,
      // charts
      GET_CHARTS_DATA: `${this.config.demobankApi}/charts`,
      // faq
      GET_FAQ_DATA: `${this.config.demobankApi}/faq`,
      GET_FAQ_LIST_BY_AMOUNT: `${this.config.demobankApi}/faqByAmount?amount=`,
      // reviews
      GET_REVIEWS_DATA: `${this.config.demobankApi}/reviews`,
      GET_REVIEWS_LIST_BY_AMOUNT: `${this.config.demobankApi}/reviewsByAmount?amount=`,
      CREATE_REVIEW: `${this.config.demobankApi}/reviewCreate`,
    };

    this.api = {
      // status
      getStatusApi: async () => await this._fetchServer({
        url: this.urls.GET_STATUS_API,
        method: 'get',
      }),
      // exchange
      getCountryIndexes: async () => await this._fetchServer({
        url: this.urls.GET_COUNTRY_INDEXES,
        method: 'get',
      }),
      getCurrencies: async () => await this._fetchServer({
        url: this.urls.GET_CURRENCIES,
        method: 'get',
      }),
      getPrice: async (crypto, currency) => await this._fetchServer({
        url: `${this.urls.GET_PRICE}?crypto=${crypto}&currency=${currency}`,
        method: 'get',
      }),
      createExchangeRequest: async (request) => await this._fetchServer({
        url: this.urls.CREATE_REQUEST,
        method: 'post',
        body: request,
      }),
      cancelRequest: async (requestId) => await this._fetchServer({
        url: this.urls.CANCEL_REQUEST + requestId,
        method: 'put',
      }),
      // charts
      getChartsData: async () => await this._fetchServer({
        url: this.urls.GET_CHARTS_DATA,
        method: 'get',
      }),
      // faq
      getFaqData: async () => await this._fetchServer({
        url: this.urls.GET_FAQ_DATA,
        method: 'get',
      }),
      getFaqListByAmount: async (count) => await this._fetchServer({
        url: this.urls.GET_FAQ_LIST_BY_AMOUNT + count,
        method: 'get',
      }),
      // reviews
      getReviewsData: async () => await this._fetchServer({
        url: this.urls.GET_REVIEWS_DATA,
        method: 'get',
      }),
      getReviewsListByAmount: async (count) => await this._fetchServer({
        url: this.urls.GET_REVIEWS_LIST_BY_AMOUNT + count,
        method: 'get',
      }),
      createReview: async (review) => await this._fetchServer({
        url: this.urls.CREATE_REVIEW,
        method: 'post',
        body: review,
      }),
    };
  };

  _fetchServer({ url = '', method = 'get', body = undefined }) {
    const Header = new Headers({ 'Content-Type': 'application/json' });

    const Params = {
      method: method,
      headers: Header,
    };

    if ((method === 'post' || method === 'put') && body !== 'undefined') {
      Params.body = JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
      fetch(url, Params)
        .then(DemobankSDK._checkHttpStatus)
        .then(data => resolve(data))
        .catch(error => {
          console.error('< -- Fetch Error -- > ', error);
          reject(error);
        });
    });
  };

  static _checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300 && response.ok) {
      if (response.status === 204) return [];
      return response.json();
    } else {
      return response.json().then(Promise.reject.bind(Promise));
    }
  };
}

function SDK({ demobankApi }) {
  if (!demobankApi) return new Error("Error...");
  return new DemobankSDK({ demobankApi });
}

export default SDK;
