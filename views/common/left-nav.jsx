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
            <div className="ant-menu ant-menu-inline  ant-menu-light ant-menu-root left-nav-wrap">
            <Menu onClick={this.handleClick}
            style={{ width: 240 }}
            openKeys={this.state.openKeys}
            onOpen={this.onToggle}
            onClose={this.onToggle}
            selectedKeys={[this.state.current]}
            mode="inline">
                <SubMenu key="sub1" title={<span><i className="fa fa-cog fa-lg"></i><span className="pl10">系统管理</span></span>}>
                    <Menu.Item key="1"><Link className="control-item" to="user">用户管理</Link></Menu.Item>
                    <Menu.Item key="2"><Link className="control-item" to="role">角色管理</Link></Menu.Item>
                    <Menu.Item key="3"><Link className="control-item" to="menu">菜单管理</Link></Menu.Item>
                    <Menu.Item key="4"><Link className="control-item" to="dict">字典管理</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><i className="fa fa-volume-up fa-lg"></i><span className="pl10">公告管理</span></span>}>
                    <Menu.Item key="5"><Link className="control-item" to="announcement">公告列表</Link></Menu.Item>
                    <Menu.Item key="6"><Link className="control-item" to="announcement">新增公告</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><i className="fa fa-street-view fa-lg"></i><span className="pl10">考勤管理</span></span>}>
                    <Menu.Item key="7"><Link className="control-item" to="teacherAttendance">教师考勤</Link></Menu.Item>
                    <Menu.Item key="8"><Link className="control-item" to="studentAttendance">学生考勤</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><i className="fa fa-cubes fa-lg"></i><span className="pl10">菜谱管理</span></span>}>
                    <Menu.Item key="9"><Link className="control-item" to="recipeInfo">菜谱管理</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" title={<span><i className="fa fa-book fa-lg"></i><span className="pl10">课程管理</span></span>}>
                    <Menu.Item key="10"><Link className="control-item" to="courseInfo">课程管理</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub6" title={<span><i className="fa fa-users fa-lg"></i><span className="pl10">教师管理</span></span>}>
                    <Menu.Item key="11"><Link className="control-item" to="teacherInfo">教师列表</Link></Menu.Item>
                    <Menu.Item key="12"><Link className="control-item" to="teacherAttendance">教师考勤</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub7" title={<span><i className="fa fa-object-ungroup fa-lg"></i><span className="pl10">班级管理</span></span>}>
                    <Menu.Item key="13"><Link className="control-item" to="clazzInfo">班级列表</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub8" title={<span><i className="fa fa-mortar-board fa-lg"></i><span className="pl10">学生管理</span></span>}>
                    <Menu.Item key="14"><Link className="control-item" to="studentInfo">学生管理</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub8" title={<span><i className="fa fa-mortar-board fa-lg"></i><span className="pl10">学生管理</span></span>}>
                    <Menu.Item key="14"><Link className="control-item" to="gradeInfo">年级管理</Link></Menu.Item>
                </SubMenu>
            </Menu>
            </div>
        );
    }
});

module.exports = LeftNav;
