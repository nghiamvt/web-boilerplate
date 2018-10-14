import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { adminOnly, adminOnlyRedux } from '@/pages/auth/auth';

function AdminPanel() {
  return (
    <Menu.Item>
      <NavLink exact to="/admincp">AdminCP</NavLink>
    </Menu.Item>
  );
}

const AdminCPLink = adminOnly(AdminPanel);
const AdminCPReduxLink = adminOnlyRedux(AdminPanel);

export default class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary>
        <Menu.Item>
          <NavLink exact to="/">Home</NavLink>
        </Menu.Item>
        <Menu.Item
          name="todo"
          active={activeItem === 'todo'}
        >
          <NavLink exact to="/todo">Todo</NavLink>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item active={activeItem === 'login'}>
            <NavLink exact to="/login">Login</NavLink>
          </Menu.Item>
          <Menu.Item active={activeItem === 'logout'}>
            <NavLink exact to="/logout">Logout</NavLink>
          </Menu.Item>
        </Menu.Menu>
        <AdminCPLink />
        <AdminCPReduxLink />
      </Menu>
    );
  }
}
