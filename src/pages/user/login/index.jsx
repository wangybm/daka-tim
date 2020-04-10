import React, { Component } from 'react';
import { connect } from 'umi';
import LoginForm from './components/loginForm';
import formMap from './map';
import styles from './index.less';
import machine from '@/assets/img/machine.png';

class Login extends Component {
  login = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/login',
      payload: params,
    });
  };
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.welcome}>欢迎使用消息服务！</span>
          <img src={machine} alt="" />
        </div>
        <LoginForm formMap={formMap} submit={this.login}></LoginForm>
      </div>
    );
  }
}

export default connect(({ user }) => ({
  ...user,
}))(Login);
