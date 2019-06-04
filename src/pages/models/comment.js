import { queryAllComment,addComment } from '../../service/houses';
import { message } from 'antd';
import store2 from 'store2';

export default {
  namespace: 'comment',

  state: {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    commentList:[],
  },

  effects: {
    *getCommentList(_, { call, put }) {
      const {list} = yield call(queryAllComment);
      yield put({
        type: 'save',
        payload: {
          commentList: list,
        },
      });
    },
    * addComment({payload},{ call, put}){
      const { comments } = payload;
      let username = store2.session('username');
      if(!username){
        username = '未知用户';
      }
      const comment = {
        ...comments,
        username
      }
      yield call(addComment, comment);
      yield message.success('发表成功',0.5);
      yield put({
        type: 'getCommentList',
      })
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
