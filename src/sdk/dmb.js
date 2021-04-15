class DemobankSDK {
  constructor(params) {
    this.config = {
      demobankApi: params.demobankApi,
    };

    this.urls = {
      GET_STATUS_API: `${this.config.demobankApi}/status`,
      GET_CHARTS_DATA: `${this.config.demobankApi}/charts`,
    };

    this.api = {
      getStatusApi: async () => await this._fetchServer(this.urls.GET_STATUS_API, 'get'),
      getChartsData: async () => await this._fetchServer(this.urls.GET_CHARTS_DATA, 'get'),
    };
  };

  _fetchServer(url, method = 'get', body = undefined) {
    const Header = new Headers({ 'Content-Type': 'application/json' });

    const Params = {
      method: method,
      headers: Header,
    };

    if (method === 'post' || method === 'put') {
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
