import { stringify } from 'qs';
import request from './request';


// export const queryApplyListApi = `${url.mock}/activity/applyList`;

export function queryAllHouse() {
  return request(`/houseList`);
}

export function queryAllComment() {
  return request(`/commentList`);
}

export function login(params){
  console.log(params)
  return request(`/house/login`,{
    method: 'post',
    params,
  });
}

export function register(params){
  return request(`/house/register`,{
    method: 'post',
    params,
  });
}

export function queryHouse(params){
  return request(`/house/search`,{
    method: 'post',
    params,
  });
}

export function exportHouse(params){
  console.log("liebiao",params)
  return request(`/house/export`,{
    method: 'post',
    params,
  });
}

export function analysisHouse(params){
  return request(`/house/analysis`,{
    method: 'post',
    params,
  });
}

export function queryAllCollection(){
  return request(`/house/collection`);
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
