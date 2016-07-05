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
                <SubMenu key="sub2" title={<span><i className="fa fa-volume-up fa-lg"></i><span className="pl10">话题管理</span></span>}>
                    <Menu.Item key="5"><Link className="control-item" to="communityannouncement">公告列表</Link></Menu.Item>
                    <Menu.Item key="6"><Link className="control-item" to="communityannouncement">新增公告</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><i className="fa fa-street-view fa-lg"></i><span className="pl10">用户管理</span></span>}>
                    <Menu.Item key="7"><Link className="control-item" to="communitystudentAttendance">教师考勤</Link></Menu.Item>
                    <Menu.Item key="8"><Link className="control-item" to="communitystudentAttendance">学生考勤</Link></Menu.Item>
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

