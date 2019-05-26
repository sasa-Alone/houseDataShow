import { queryAllComment } from '../../service/houses';

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
      const { comments } = yield call(queryAllComment);
      console.log("comments,comments",comments)
      yield put({
        type: 'save',
        payload: {
          commentList: comments,
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
