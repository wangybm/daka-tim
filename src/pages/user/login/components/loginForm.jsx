import React, { Component, useState } from 'react';
import { Form, Input, Button } from 'antd';
import styles from './index.less';

const { Item } = Form;

const LoginForm = props => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
    props.submit(values);
  };
  return (
    <div className={styles.login_pane}>
      <Form layout="vertical" onFinish={onFinish}>
        {props.formMap.map(item => (
          <Item
            key={item.name}
            name={item.name}
            label={item.label}
            rules={item.rules}
          >
            <Input
              type={item.type}
              allowClear={item.allowClear}
              placeholder={item.placeholder}
            />
          </Item>
        ))}
        <Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className={styles.login_btn}
          >
            登录
          </Button>
        </Item>
      </Form>
    </div>
  );
};

LoginForm.defaultProps = {
  submit: () => {},
  formMap: [],
};

export default LoginForm;
