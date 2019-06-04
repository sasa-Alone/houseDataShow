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
  console.log("liebiao", params)
  return request(`/house/export`, {
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

