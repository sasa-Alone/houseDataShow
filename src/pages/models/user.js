import { queryAllCollection } from '../../service/houses';

export default {
  namespace: 'user',

  state: {
    collections:[],
    selectedRowKeys: [],//table中选中的数据条数
    selectedRows:[],//table中选中的数据
  },

  effects: {
    *getCollectionList(_, { call, put }) {
      const { houses } = yield call(queryAllCollection);
      console.log("collections,collections",houses)
      yield put({
        type: 'save',
        payload: {
          collections:houses,
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
