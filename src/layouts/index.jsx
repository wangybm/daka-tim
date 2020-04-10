import React, { Component } from 'react';
import { Redirect } from 'umi';
import UserLayout from './userLayout';
import BasicLayout from './basicLayout';
import { isLogin } from '@/utils/util';

export default props => {
  if (props.location.pathname.startsWith('/user')) {
    return <UserLayout>{props.children}</UserLayout>;
  }
  return isLogin() ? (
    <BasicLayout>{props.children}</BasicLayout>
  ) : (
    <Redirect to="/user/login" />
  );
};
