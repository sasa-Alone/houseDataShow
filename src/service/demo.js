import { stringify } from 'qs';
import request from './request.js';
import { url } from './service-utils.js';

/**
 * service示例
 */
export function getPageConfig() {
  const params = {
    page: 0,
    pageSize: 999,
    show: 1,
  };

  return request(`${url.demo}/pageConfig?${stringify(params)}`);
}
