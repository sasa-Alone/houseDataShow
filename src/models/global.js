import { login } from '../service/houses';
import store2 from 'store2';
import { message } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    loginVisible: false,
    registerVisible: false,
  },

  effects: {
    * login({payload}, { call, put }) {
      const { username,password } = payload;
      yield call(login,{username,password});
      store2.session('username',username);
      yield put({
        type:'save',
        payload:{
          loginVisible:false,
        }
      })
      yield message.success('登录成功',0.5);
      router.push("/index")
    },
    * register({payload}, { call, put }) {
      const { username,password } = payload;
      yield call(login,{username,password});
      // store2.session('username',username);
      yield put({
        type:'save',
        payload:{
          registerVisible:false,
        }
      })
      yield message.success('注册成功',0.5);
      router.push("/")
    },
  },

  reducers: {
    save(state, { payload }){
      console.log("daozhele")
      return {
        ...state,
        ...payload,
      }
    },
  }
}
