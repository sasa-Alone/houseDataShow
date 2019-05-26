import { queryAllHouse } from '../../service/houses';

export default {
  namespace: 'searchHouse',

  state: {
    houseList:[],
    selectedRowKeys: [],
    previewVisible: false,
    previewImage: '',
    fileList: [],
  },

  effects: {
    *getHouseList(_, { call, put }) {
      const { houses } = yield call(queryAllHouse);
      yield put({
        type: 'save',
        payload: {
          houseList: houses,
          selectedRowKeys: [],
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
