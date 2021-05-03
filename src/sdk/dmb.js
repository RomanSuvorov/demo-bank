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
      getStatusApi: async () => await this._fetchServer(
        this.urls.GET_STATUS_API,
        'get',
      ),
      // exchange
      getCountryIndexes: async () => await this._fetchServer(
        this.urls.GET_COUNTRY_INDEXES,
        'get',
      ),
      // charts
      getChartsData: async () => await this._fetchServer(
        this.urls.GET_CHARTS_DATA,
        'get',
      ),
      // faq
      getFaqData: async () => await this._fetchServer(
        this.urls.GET_FAQ_DATA,
        'get',
      ),
      getFaqListByAmount: async (count) => await this._fetchServer(
        this.urls.GET_FAQ_LIST_BY_AMOUNT + count,
        'get',
      ),
      // reviews
      getReviewsData: async () => await this._fetchServer(
        this.urls.GET_REVIEWS_DATA,
        'get',
      ),
      getReviewsListByAmount: async (count) => await this._fetchServer(
        this.urls.GET_REVIEWS_LIST_BY_AMOUNT + count,
        'get',
      ),
      createReview: async (review) => await this._fetchServer(
        this.urls.CREATE_REVIEW,
        'post',
        review,
      ),
    };
  };

  _fetchServer(url, method = 'get', body = undefined) {
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
