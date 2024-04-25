import { AnyObject } from "@/typings/index.interfaces";

// AbortController超时配置
const fetchWithTimeout = (url: string, options: RequestInit & { timeout?: number }): Promise<Response | void> => {
  const { timeout = 10000 } = options; // 设置默认超时时间为10000ms
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(`Request Timeout of ${timeout}ms exceeded; \n URL: ${url} \n Request Init: \n${JSON.stringify(options)}`), timeout);
  return fetch(url, {
    ...options,
    signal: controller.signal
  }).then((response) => {
    clearTimeout(timerId);
    return response;
  }).catch((error) => {
    clearTimeout(timerId);
    throw error;
  });
};

interface IConfigReq {
  data?: AnyObject;
  params?: AnyObject;
  header?: AnyObject;
}

export const getFetch = async (url: string, config?: IConfigReq): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryStr = '';
      if (config && config.params) {
        const _params = config.params;
        const keys = Object.keys(_params);
        queryStr = keys.reduce((prev, curr, index) => {
          const str = prev + `${curr}=${_params[curr]}`;
          return keys.length === index + 1 ? str : str + '&';
        }, '?');
      }
      const input = process.env.BaseUrl + url + encodeURI(queryStr);
      const response = await fetchWithTimeout(input, {
        method: "GET",
        headers: Object.assign({ "Content-Type": "application/json" }, config && config.header ? config.header : {}) as HeadersInit,
        keepalive: false,
        body: config && config.data ? JSON.stringify(config.data) : null,
      });

      if (response && response.status === 200 && response.ok) {
        const res = await response.json();
        if (res && res.status === 0 && res.data) {
          resolve(res.data);
        }
        reject()
      }
      reject()
    } catch (e) {
      reject()
    }
  })
}


export const postFetch = async (url: string, config?: IConfigReq): Promise<any> => {

  return new Promise(async (resolve, reject) => {
    try {
      let queryStr = '';
      if (config && config.params) {
        const _params = config.params;
        const keys = Object.keys(_params);
        queryStr = keys.reduce((prev, curr, index) => {
          const str = prev + `${curr}=${_params[curr]}`;
          return keys.length === index + 1 ? str : str + '&';
        }, '?');
        url += encodeURI(queryStr);
      }
      const response = await fetchWithTimeout(url, {
        method: "POST",
        headers: Object.assign({ "Content-Type": "application/json" }, config && config.header ? config.header : {}) as HeadersInit,
        keepalive: false,
        body: config && config.data ? JSON.stringify(config.data) : null,
      });

      if (response && response.status === 200 && response.ok) {
        const res = await response.json();
        if (res && res.status === 0 && res.data) {
          resolve(res.data);
        }
        reject()
      }
      reject()
    } catch (e) {
      reject()
    }
  })
}
