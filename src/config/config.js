import {
  DatabaseOutlined
} from '@ant-design/icons';

export const routes = [{
  path: '/user/login',
  title: '登录'
}, {
  path: '/statistics/user',
  title: '用户统计'
}, {
  path: '/statistics/message',
  title: '消息统计'
}]

export const menu = [{
  path: '/statistics',
  name: '数据统计',
  icon: < DatabaseOutlined / > ,
  children: [{
    path: '/statistics/user',
    name: '用户统计',
  }, {
    path: '/statistics/message',
    name: '消息统计',
  }]
}]
