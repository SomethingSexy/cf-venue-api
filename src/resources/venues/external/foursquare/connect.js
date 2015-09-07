import https from 'https';
import urlParser from 'url';
import qs from 'querystring';
import Q from 'q';
import util from 'util';

const extractData = (result) => {
  let json;

  if (result !== undefined) {
    json = JSON.parse(result);

    if (json.meta && json.meta.code === 200) {
      if (json.meta.errorType) {
        if (config.foursquare.warnings === 'ERROR') {
          throw new Error(message);
        }
      }
      if (json.response !== undefined) {
        return json.response;
      } else {
        return {};
      }
    } else if (json.meta) {
      throw new Error(json.meta.code + ': ' + json.meta.errorDetail);
    } else {
      throw new Error('Response had no code: ' + util.inspect(json));
    }
  } else {
    throw new Error('Foursquare had no response or status code.');
  }
};

// new Rquest({}).post().start().then();
// new Require().config().config().post().start().then();
// new Request().post().get().start().then();

const promiseRequest = (url, method) => {
  return Q.Promise((resolve, reject) => { // eslint-disable-line new-cap
    const parsedUrl = urlParser.parse(url, true);
    let result = '';

    if (parsedUrl.protocol === 'https:' && !parsedUrl.port) {
      parsedUrl.port = 443;
    }

    if (parsedUrl.query === undefined) {
      parsedUrl.query = {};
    }
    const path = parsedUrl.pathname + '?' + qs.stringify(parsedUrl.query);
    console.log('retrieve: Request path: ' + path);
    // const locale = config.locale || 'en';
    const locale = 'en';

    const request = https.request({
      host: parsedUrl.hostname,
      port: parsedUrl.port,
      path: path,
      method: method,
      headers: {
        'Content-Length': 0,
        'Accept-Language': locale
      }
    }, (res) => {
      res.on('data', (chunk) => {
        result += chunk;
      });
      res.on('end', () => {
        let jsonResult;
        try {
          jsonResult = extractData(result);
        } catch(e) {
          reject(e.message);
        }

        resolve(jsonResult);
      });
    });
    request.on('error', (error) => {
      reject('retrieve: Error calling remote host: ' + error.message);
    });

    request.end();
  });
};


class FoursquareConnection {
  constructor(apiUrl, accessToken, version) {
    this.apiUrl = apiUrl;
    if (typeof accessToken === 'object') {
      const {clientId, clientSecret} = accessToken;
      this.clientId = clientId;
      this.clientSecret = clientSecret;
    } else {
      this.accessToken = accessToken;
    }
    this.version = version;
    this.requests = [];
  }

  post() {
    throw new Error('Not implemented yet!');
  }

  get(path, params) {
    let  url = this.apiUrl + path;

    const processedParams = this._processParams(params);

    if (processedParams) {
      url += '?' + qs.stringify(processedParams);
    }

    this._addRequest(url, 'GET');
  }

  start() {
    return this.requests.reduce(Q.when, Q({})); // eslint-disable-line new-cap
  }

  _processParams(params) {
    const localParams = params || {};

    if ((localParams.lat && !localParams.lng) || (!localParams.lat && localParams.lng)) {
      throw new Error('callApi:parameters: if you specify a longitude or latitude, you must include BOTH.');
    }

    if (localParams.lat && localParams.lng) {
      localParams.ll = localParams.lat + ',' + localParams.lng;
      delete localParams.lat;
      delete localParams.lng;
    }
    if (this.accessToken) {
      localParams.oauth_token = this.accessToken;
    } else {
      localParams.client_id = this.clientId;
      localParams.client_secret = this.clientSecret;
    }

    localParams.v = this.version;

    return localParams;
  }

  _addRequest(url, method) {
    // add a request func, binding our two necessary parameters
    // makes it easier to process later
    this.requests.push(promiseRequest.bind(undefined, url, method));
  }
}

export default FoursquareConnection;
