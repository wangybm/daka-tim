import {
  getDvaApp
} from 'umi';
import moment from 'moment'

export const isLogin = () => {
  const store = getDvaApp()._store;
  const {
    userInfo
  } = store.getState().user
  return Boolean(userInfo.id)
}

export const formatDate = (timestamp = Date.now()) => moment(timestamp).format('YYYY-MM-DD')

export const fromNow = num => moment().subtract(num - 1, 'days').format('YYYY-MM-DD')

export const dateRange = (num, type = 'date') => {
  const start = moment().subtract(num - 1, 'days').format('YYYY-MM-DD')
  const end = moment().format('YYYY-MM-DD')
  const dateFormat = 'YYYY-MM-DD';
  if (type === 'string') {
    return [start, end]
  }
  return [moment(start, dateFormat), moment(end, dateFormat)]
}

export const hexToRgba = (hex, opacity) => hex && hex.replace(/\s+/g, "").length === 7 ?
  "rgba(" +
  parseInt("0x" + hex.slice(1, 3)) +
  "," +
  parseInt("0x" + hex.slice(3, 5)) +
  "," +
  parseInt("0x" + hex.slice(5, 7)) +
  "," +
  opacity +
  ")" :
  "";
