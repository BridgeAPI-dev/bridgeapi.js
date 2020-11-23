import Axios from 'axios';

const urls = {
  test: 'http://localhost:3001',
  development: 'http://bridgeapi-production.us-east-2.elasticbeanstalk.com',
  production: 'http://bridgeapi-production.us-east-2.elasticbeanstalk.com',
};
const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
