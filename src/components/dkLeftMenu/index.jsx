import React, { PureComponent } from 'react';
import { history } from 'umi';
import { Menu } from 'antd';

const { SubMenu, Item } = Menu;

export default props => {
  const { menu } = props;
  const getMenus = menus =>
    menus.map(item => {
      return item.children && item.children.length ? (
        <SubMenu
          key={item.path}
          title={
            <span>
              {item.icon}
              {item.name}
            </span>
          }
        >
          {getMenus(item.children)}
        </SubMenu>
      ) : (
        <Item key={item.path}>
          {item.icon}
          {item.name}
        </Item>
      );
    });
  return (
    <Menu
      mode="inline"
      defaultOpenKeys={['/statistics']}
      defaultSelectedKeys={['/statistics/user']}
      onClick={({ key }) => history.push(key)}
    >
      {getMenus(menu)}
    </Menu>
  );
};
