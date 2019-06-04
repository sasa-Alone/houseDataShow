import { queryAllCollection,unCollection } from '../../service/houses';
import store2 from 'store2';
import { message } from 'antd';

export default {
  namespace: 'user',

  state: {
    collections:[],
    selectedRowKeys: [],//table中选中的数据条数
    selectedRows:[],//table中选中的数据
  },

  effects: {
    *getCollectionList(_, { call, put }) {
      const username = store2.session('username')
      const { houses } = yield call(queryAllCollection,{username});
      console.log("collections,collections",houses)
      yield put({
        type: 'save',
        payload: {
          collections:houses,
        },
      });
    },
    * unCollection({payload},{call, put}){
      const { house } = payload;
      const houseId = house._id
      const username = store2.session('username');
      yield call(unCollection,{houseId,username});
      yield message.success('取消成功',0.5);
      yield put({
        type: 'getCollectionList',
      })
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
