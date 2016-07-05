import '../../node_modules/antd/lib/index.css';
let React = require('react');
let ReactDOM = require('react-dom');
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
let Router = require('react-router');
let { Route, Redirect, RouteHandler, Link ,DefaultRoute} = Router;

const LeftNav = React.createClass({
    getInitialState() {
        return {
            current: '1',
            openKeys: []
        };
    },
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1)
        });
    },
    onToggle(info) {
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
        });
    },
    render() {
        return (
            <div>
            <div className="ant-menu ant-menu-inline  ant-menu-light ant-menu-root left-nav-wrap">
            <Menu onClick={this.handleClick}
            style={{ width: 240 }}
            openKeys={this.state.openKeys}
            onOpen={this.onToggle}
            onClose={this.onToggle}
            selectedKeys={[this.state.current]}
            mode="inline">
              <Menu.Item key="1"><Link className="control-item" to="user">用户管理</Link></Menu.Item>
              <Menu.Item key="2"><Link className="control-item" to="role">角色管理</Link></Menu.Item>
              <Menu.Item key="3"><Link className="control-item" to="menu">菜单管理</Link></Menu.Item>
              <Menu.Item key="4"><Link className="control-item" to="dict">字典管理</Link></Menu.Item>
            </Menu>
            </div>
            <section className="content">
                <RouteHandler />
            </section>
            </div>
        );
    }
});

module.exports = LeftNav;
