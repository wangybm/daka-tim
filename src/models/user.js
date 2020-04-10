import {
  login
} from '@/service/user';
import {
  Message
} from 'antd'
import {
  history
} from 'umi'
export default {
  state: {
    userInfo: JSON.parse(sessionStorage.getItem('user')) || {}
  },
  reducers: {
    setUserInfo(state, {
      payload
    }) {
      sessionStorage.setItem('user', JSON.stringify(payload))
      return {
        ...state,
        userInfo: payload
      }
    }
  },
  effects: {
    * login({
      payload
    }, {
      call,
      put
    }) {
      const {
        code,
        data,
        message
      } = yield call(login, payload);
      if (code === 200) {
        yield put({
          type: 'setUserInfo',
          payload: data
        })
        history.replace('/')
      } else {
        Message.error(message)
      }
    },
  },
};
