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
                <SubMenu key="sub1" title={<span><i className="fa fa-cog fa-lg"></i><span className="pl10">商家管理</span></span>}>
                    <Menu.Item key="1"><Link className="control-item" to="shopannouncement">用户管理</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><i className="fa fa-volume-up fa-lg"></i><span className="pl10">商品管理</span></span>}>
                    <Menu.Item key="5"><Link className="control-item" to="shopstudentAttendance">公告列表</Link></Menu.Item>
                </SubMenu>
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

