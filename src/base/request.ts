import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://127.0.0.1:4523/m1/3177900-0-default',
  timeout: 1000 * 6
})

let tokenFetcher: Function;

export const setTokenFetcher = (newFunction: () => string | null) => {
  tokenFetcher = newFunction;
};

httpClient.interceptors.request.use(
  (config: any) => {
    const token = tokenFetcher && tokenFetcher();

    if (token) {
      config.headers['token'] = token;
    }
    return config
  },
  (error) => error
)

let authErrorHandler: Function;

export const setAuthErrorHandler = (fn: any) => {
  authErrorHandler = fn;
}


httpClient.interceptors.response.use(
  (response) => {
    console.log(response)
    if (response.status === 200) {
      return response.data;
    }
    return response.data;
  },
  (error) => {
    authErrorHandler && authErrorHandler();
    return Promise.reject(error);
  }
)

export default httpClient;