import {
  stringify
} from 'qs';
import request from './request';

export function queryAllHouse(params) {
  return request(`/house/list?${stringify(params)}`);
}

export function queryAllComment() {
  return request(`/house/commentList`);
}

export function login(params) {
  console.log(params)
  return request(`/house/login`, {
    method: 'post',
    header: {
      contentType: 'application/json'
    },
    data: params,
  });
}

export function register(params) {
  return request(`/house/register`, {
    method: 'post',
    header: {
      contentType: 'application/json'
    },
    data: params,
  });
}

export function queryHouse(params) {
  return request(`/house/search`, {
    method: 'post',
    header: {
      contentType: 'application/json'
    },
    data: params,
  });
}

export function exportHouse(params) {
  return request(`/house/getHouseByIds`, {
    method: 'post',
    data: params,
  });
}

export function analysisHouse(params) {
  return request(`/house/analysis`, {
    method: 'post',
    data: params,
  });
}

export function queryAllCollection(params) {
  return request(`/house/collectionList?${stringify(params)}`);
}

export function addComment(params){
  return request(`/house/comment`, {
    method: 'post',
    data: params,
  });
}


export function addCollection(params){
  return request(`/house/addCollection?${stringify(params)}`);
}

export function unCollection(params){
  return request(`/house/unCollection?${stringify(params)}`);
}

export function crawl(){
  return request(`/house/startCrawl`);
}

export function getRecord(){
  return request(` /house/getRecord`);
}

export function queryPieData(){
  return request(` /house/getPieOption`);
}


export function queryAvePrice(){
  return request(`/house/getAvePrice`);
}

export function queryHouseNumber(){
  return request(`/house/getHouseNumber`);
}

export function queryCloudTags(){
  return request(`/house/getHouseTags`);
}

export function queryMapData(){
  return request(`/house/getMapData`);
}
