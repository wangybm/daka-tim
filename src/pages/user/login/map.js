import {
  email
} from '@/utils/pattern'

export default [{
  name: 'username',
  label: '用户名',
  placeholder: '请输入用户名',
  allowClear: true,
  rules: [{
    required: true,
    message: '请输入用户名'
  }, {
    pattern: email,
    message: '请输入正确的邮箱格式'
  }]
}, {
  name: 'password',
  type: 'password',
  label: '密码',
  placeholder: '请输入密码',
  allowClear: true,
  rules: [{
    required: true,
    message: '请输入密码'
  }]
}]
