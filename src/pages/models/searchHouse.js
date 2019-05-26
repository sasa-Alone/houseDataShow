import { queryAllHouse } from '../../service/houses';

export default {
  namespace: 'searchHouse',

  state: {
    houseList:[],
  },

  effects: {
    *getHouseList(_, { call, put }) {
      const { houses } = yield call(queryAllHouse);
      yield put({
        type: 'save',
        payload: {
          houseList: houses,
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
