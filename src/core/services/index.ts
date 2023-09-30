import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import * as _ from 'lodash';

/**
 * @template T the type of the action's `response` tag.
 */
function sendRequest<T, D = any>(config: AxiosRequestConfig<D>): Promise<T> {
  const defaultHeaders = {
    'x-community-type': 0,
    'x-platform-type': 2,
  };
  if (!config.headers) {
    config.headers = {};
  }

  const token = process.env.REACT_APP_TOKEN;
  config.headers['Authorization'] = `Bearer ${token}`;
  config.baseURL = 'https://graph.facebook.com/v18.0';
  config.headers = _.merge(config.headers, defaultHeaders);

  return axios<any, AxiosResponse<T>>(config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch((err) => {
      if (err.data == null) {
        err.errorCode = -1;
        throw err;
      } else {
        throw err.response.data;
      }
    });
}

/**
 * @template T the type of the action's `response`.
 * @template Q the type of the query's `param` in URL `Optionals`.
 */
export function GET<T, Q = any>(url: string, params?: Q, headers?: RawAxiosRequestHeaders): Promise<T> {
  return sendRequest({ method: 'GET', url, headers, params });
}

/**
 * @template T the type of the action's `response` tag.
 * @template B the type of the body's `param` JSON.
 */
export function POST<T, B = any>(url: string, data: B, headers?: RawAxiosRequestHeaders): Promise<T> {
  return sendRequest({ method: 'POST', data, url, headers });
}

/**
 * @template T the type of the action's `response` tag.
 * @template B the type of the body's `param` JSON.
 */
export function PUT<T, B = any>(url: string, data: B, headers: RawAxiosRequestHeaders): Promise<T> {
  return sendRequest({ method: 'PUT', data, url, headers });
}

/**
 * @template T the type of the action's `response` tag.
 * @template B the type of the body's `param` JSON.
 */
export function DELETE<T, B = any>(url: string, data: B, headers: RawAxiosRequestHeaders): Promise<T> {
  return sendRequest({ method: 'DELETE', data, url, headers });
}
