import {
  getUserDau,
  getUserTrend,
  getUserAnalysis,
  getMessageDsm
} from '@/service/stat';
import {
  Message
} from 'antd'
export default {
  state: {
    userDau: null,
    userTrend: null,
    analysis: null,
    messageDsm: null
  },
  reducers: {
    setUserDau(state, {
      payload
    }) {
      return {
        ...state,
        userDau: payload
      }
    },
    setUserTrend(state, {
      payload
    }) {
      return {
        ...state,
        userTrend: payload
      }
    },
    setAnalysis(state, {
      payload
    }) {
      return {
        ...state,
        analysis: payload
      }
    },
    setMessageDsm(state, {
      payload
    }) {
      return {
        ...state,
        messageDsm: payload
      }
    }
  },
  effects: {
    * getUserDau({
      payload
    }, {
      call,
      put
    }) {
      const {
        code,
        data,
        message
      } = yield call(getUserDau, payload)
      if (code === 200) {
        yield put({
          type: 'setUserDau',
          payload: data
        })
      } else {
        Message.error(message)
      }
    },
    * getUserTrend({
      payload
    }, {
      call,
      put
    }) {
      const {
        code,
        data,
        message
      } = yield call(getUserTrend, payload)
      if (code === 200) {
        yield put({
          type: 'setUserTrend',
          payload: data
        })
      } else {
        Message.error(message)
      }
    },
    * getUserAnalysis({
      payload
    }, {
      call,
      put
    }) {
      const {
        code,
        data,
        message
      } = yield call(getUserAnalysis, payload)
      if (code === 200) {
        yield put({
          type: 'setAnalysis',
          payload: data
        })
      } else {
        Message.error(message)
      }
    },
    * getMessageDsm({
      payload
    }, {
      call,
      put
    }) {
      const {
        code,
        data,
        message
      } = yield call(getMessageDsm, payload);
      if (code === 200) {
        yield put({
          type: 'setMessageDsm',
          payload: data
        })
      } else {
        Message.error(message)
      }
    }
  },
};
