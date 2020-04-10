import React, { Component } from 'react';
import { connect } from 'umi';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.less';
import icon from '@/assets/img/icon_message.png';

const { Item } = Menu;

const menu = (
  <Menu>
    <Item>账号信息</Item>
    <Item>修改密码</Item>
    <Item>退出登录</Item>
  </Menu>
);

const dkHeader = props => {
  const { userInfo, showRight } = props;
  return (
    <>
      <div className={styles.left}>
        <img src={icon} alt="" />
        <span className={styles.title}>消息服务</span>
        <span className={styles.vertical}></span>
        <span className={styles.sub_title}>打卡助手</span>
      </div>
      {showRight && (
        <Dropdown overlay={menu} placement="bottomRight">
          <span className={styles.right}>
            <img src={props.avatar} alt="" />
            <span>{userInfo.account}</span>
            <DownOutlined />
          </span>
        </Dropdown>
      )}
    </>
  );
};

export default connect(({ user }) => ({
  ...user,
}))(dkHeader);
