import {
  queryAllHouse,
  queryHouse,
  exportHouse,
  analysisHouse,
  addCollection,
} from '../../service/houses';
import store2 from 'store2';
import { message } from 'antd';

export default {
  namespace: 'searchHouse',

  state: {
    houseList: [], //表格中展示的列表
    selectedRowKeys: [],//table中选中的数据条数
    selectedRows:[],//table中选中的数据
    previewVisible: false,
    previewImage: '',
    fileList: [],
    collections:[], //收藏的房源
    selectConditons:{
      platform:	'',	//平台类型
      type:	'',	//租赁方式
      area:	'',	//区域
      price:	'',	//价格区间
      model:	'',	//居室
      size:	'',	//面积
      special:	'',	//特色
    },
    selectConditon:'',//用户输入的条件
    areas: {
      'bj': ['东城', '西城', '朝阳', '海淀', '丰台', '石景山', '通州', '昌平', '大兴', '顺义', '房山', '门头沟', '亦庄开发区'],
      'sz': ['南山区', '宝安区', '福田区', '罗湖区', '龙华区', '龙岗区'],
      'sh': ['徐汇', '闵行', '浦东', '闸北', '嘉定', '松江', '普陀', '杨浦', '虹口', '长宁', '宝山', '静安', '黄浦', '青浦'],
      'hz': ['上城', '下城', '余杭', '拱墅', '江干', '滨江', '萧山', '西湖', '钱塘新区'],
      'nj': ['江宁', '雨花台', '鼓楼', '建邺', '栖霞', '浦口', '玄武', '秦淮'],
      'cd': ['双流', '天府新区', '成华', '武侯', '金牛', '锦江', '青阳', '高新'],
      'wh': ['东湖高新', '东西湖', '武昌', '汉阳', '江夏', '江岸', '江汉', '洪山', '硚口'],
      'gz': ['天河', '海珠', '越秀', '番禺', '白云', '荔湾', '黄埔', '花都', '增城'],
      'tj': ['东丽', '南开', '和平', '河东', '河西', '海河教育园区', '西青', '北辰', '河北', '津南', '红桥'],
    }
  },

  effects: {
    * getHouseList(_, { call, put }) {
      let username = store2.session('username');
      if(!username){
        username = '';
      }
      const { houses } = yield call(queryAllHouse,{username});
      yield put({
        type: 'save',
        payload: {
          houseList: houses,
          selectedRowKeys: [],
        },
      });
    },
    * fetchHouses({payload},{ call, put }){
      const selectConditons = payload.selectConditons;
      console.log(selectConditons)
      const { houses } = yield call(queryHouse,selectConditons);
      yield put({
        type:'save',
        payload:{
          houseList:houses,
        }
      })
    },
    * addCollection({payload},{call, put}){
      const { house } = payload;
      const houseId = house._id
      const username = store2.session('username');
      yield call(addCollection,{houseId,username});
      yield message.success('收藏成功',0.5);
      yield put({
        type: 'getHouseList',
      });
    },
    * export(_,{ call ,select}){
      const { searchHouse } = yield select();
      const { selectedRows } = searchHouse.selectedRows;
      console.log("selectedRows",selectedRows)
      yield call(exportHouse,{ selectedRows });
    },
    * analysis(_,{ call ,select}){
      const { searchHouse } = yield select();
      const { selectedRows } = searchHouse.selectedRows;

      yield call(analysisHouse,{ selectedRows });
    }
  },

  reducers: {
    save(state, {
      payload
    }) {
      return {
        ...state,
        ...payload,
      }
    },
  }
}
