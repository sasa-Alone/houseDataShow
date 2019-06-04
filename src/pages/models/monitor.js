import { crawl } from '../../service/houses';
// import { message } from 'antd';
// import store2 from 'store2';

export default {
  namespace: 'monitor',

  state: {
    active: 0,
    result: true,
    recordList: []
  },

  effects: {
    * stratCrawl(_, { call, put }) {
      yield call(crawl);
      // const item = {
      //   id: i,
      //   status: i % 2 === 0,
      //   statusName: i % 2 === 0 ? '成功' : '失败',
      //   name: `第${i}次爬取数据`,
      // };
      yield put({
        type: 'save',
        payload: {
          active: 2,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }){
      return {
        ...state,
        ...payload,
      }
    },
  }
}
