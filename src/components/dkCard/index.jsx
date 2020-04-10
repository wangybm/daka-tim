import React, { Component } from 'react';
import { Card, Popover } from 'antd';
import classnames from 'classnames';
import {
  QuestionCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import styles from './index.less';

export default props => (
  <Card
    style={{ minWidth: 250 }}
    className={classnames(styles.card, {
      [styles.active]: props.isActive,
    })}
  >
    <p>
      <span>{props.title}</span>
      <Popover placement="topRight" content={props.popContent}>
        <QuestionCircleOutlined />
      </Popover>
    </p>
    <p>
      <span className={styles.count}>{props.count}</span>
      <span
        style={{ marginRight: 8 }}
        className={props.percent > 0 ? styles.red : styles.green}
      >
        {props.percent > 0 && '+'}
        {props.percent + '%'}
      </span>
      {props.percent > 0 ? (
        <ArrowUpOutlined className={styles.red} />
      ) : (
        <ArrowDownOutlined className={styles.green} />
      )}
    </p>
  </Card>
);
