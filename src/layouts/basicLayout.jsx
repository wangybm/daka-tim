import React, { Component } from 'react';
import { Layout } from 'antd';
import DkHeader from '@/components/dkHeader/index.jsx';
import DkLeftMenu from '@/components/dkLeftMenu/index.jsx';
import { menu } from '@/config/config';
import styles from './index.less';
import avatar from '@/assets/img/avatar.png';
const { Header, Sider, Content } = Layout;

export default props => (
  <Layout className={styles.basic_layout}>
    <Header className={styles.header}>
      <DkHeader avatar={avatar} showRight />
    </Header>
    <Layout className={styles.layout2}>
      <Sider className={styles.sider}>
        <DkLeftMenu menu={menu} />
      </Sider>
      <Content>{props.children}</Content>
    </Layout>
  </Layout>
);
