export default {
  namespace: 'global',

  state: {
    collapsed: false,
  },

  effects: {

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
