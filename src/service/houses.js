// import { stringify } from 'qs';
import request from './request';


// export const queryApplyListApi = `${url.mock}/activity/applyList`;

export function queryAllHouse() {
  return request(`/houseList`);
}

export function queryAllComment() {
  return request(`/commentList`);
}

// export function queryActivityDetail(params){
//   return request(`${url.mock}/activity/detail?${stringify(params)}`);
// }

// export function cancleApply(params){
//   return request(`${url.mock}/activity/cancer?${stringify(params)}`);
// }

// export function queryActivityQuestion(params){
//   return request(`${url.mock}/activity/question?${stringify(params)}`);
// }

// export function saveUserAnswer(params){
//   return request(`${url.mock}/activity/apply`,
//   {
//     method: 'post',
//     params,
//   });
// }
