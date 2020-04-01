const model = {
  namespace: 'index',
  state: {
    name: 'hopperhuang'
  },
  effects: {
    *name ({ payload }, { call, put }) {
      yield put({
          type: 'responseData',
          payload: {
            name: payload
          },
      });
  },
  },
  reducers: {
    responseData (state, action) {
        return {
            ...state,
            ...action.payload,
        };
    }
  },
};

export default model;

