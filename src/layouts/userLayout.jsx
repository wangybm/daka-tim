import React, { Component } from 'react';
import { Layout } from 'antd';
import DkHeader from '@/components/dkHeader/index.jsx';
import styles from './index.less';

const { Header, Footer, Content } = Layout;

export default props => (
  <Layout className={styles.user_layout}>
    <Header className={styles.header}>
      <DkHeader />
    </Header>
    <Content className={styles.content}>{props.children}</Content>
    <Footer className={styles.footer}>
      技术版权所有 © 天津卓朗科技发展有限公司 2019 TROILA.Inc. 保留一切权利。
    </Footer>
  </Layout>
);
