import { queryPieData,queryAvePrice,queryHouseNumber,queryCloudTags,queryMapData } from '../../service/houses';
import store2 from 'store2';

export default {
  namespace: 'data',

  state: {
    pipeData: {},
    avePrice:{},
    houseNumber:{},
    tagsResult:{
      '自如' :[],
      '蛋壳公寓':[],
      '嗨住':[],
    },
    mapData:[],
  },

  effects: {
    * getData(_, { call, put }) {
      const { result } = yield call(queryPieData);
      const { result:averesult} = yield call(queryAvePrice);
      const { result:houseNumber } = yield call(queryHouseNumber);
      const { result:tagsResult } = yield call(queryCloudTags);
      const mapData = yield call(queryMapData);

      let tags = {
        '自如' :[],
        '蛋壳公寓':[],
        '嗨住':[],
      }
      for(let item in tagsResult){
        tags[item] = []
        for(let tagName in tagsResult[item]){
          tags[item].push({
            name:tagName,
            value:tagsResult[item][tagName]
          })
        }
      }
      console.log(tags)
      yield put({
        type: 'save',
        payload: {
          pipeData: result,
          avePrice: averesult,
          houseNumber,
          tagsResult:tags,
          mapData,
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
