import {
  extend
} from 'umi-request';
import querystring from 'querystring'

const request = extend({
  timeout: 5000,
  validateCache: (url, options) => {
    if (options.method.toLowerCase() === 'post') {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      };
      options.body = querystring.stringify(options.data);
    }
  },
  errorHandler: function (error) {
    console.log(error);
  },
});

export default request;
