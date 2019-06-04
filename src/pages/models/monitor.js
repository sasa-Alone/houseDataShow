import { crawl, getRecord } from '../../service/houses';
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
      const { result } = yield call(getRecord);
      yield put({
        type: 'save',
        payload: {
          active: 2,
          recordList: result,
        },
      });
    },
    * getRecord(_,{ call, put }){
      const { result } = yield call(getRecord);
      result.reverse()
      yield put({
        type: 'save',
        payload: {
          recordList: result,
        },
      });
    }
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
