import '../../node_modules/antd/lib/index.css';
import '../../public/css/common.css';
let React = require('react');
let ReactDOM = require('react-dom');
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
let Router = require('react-router');
let { Route, Redirect, RouteHandler, Link ,DefaultRoute} = Router;

const MiddleNav = React.createClass({
    getInitialState() {
        return {
            current: 'mail',
            menuData:[]
        };
    },
    handleClick(e) {
        console.log('click ', e);
        this.setState({
               current: e.key
        });
    },

    componentDidMount: function() {
        $.ajax({
              url: "menu/list/topMenu",
              dataType: 'json',
              type: "get",
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                console.log(data.length);
                console.log(data);
                this.setState({
                  menuData: data,
                });

              }.bind(this),
              error: function(xhr, status, err) {
                console.error("menu/list/leftmenu", status, err.toString());
              }.bind(this)
        });
    },

    render() {
      let _menuData = this.state.menuData;
      let menuList = _menuData.map(menu => <Menu.Item key={menu.id}>
                                    <Link className="control-item" to={menu.menuPath}>{menu.menuName}</Link>
                                  </Menu.Item>
                  );

        return (
            <div className="middle-nav">
            <div className="middle-nav-left">
                控制台
            </div>
            <div className="middle-nav-right">
            <Menu onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            theme={this.state.theme}
            mode="horizontal">
                {menuList}
                <Menu.Item key="allSchoolManager">
                    <Link className="control-item" to="allSchoolManager"><i className="fa fa-child"></i>幼儿园管理</Link>
                </Menu.Item>
                <Menu.Item key="communityManager">
                    <Link className="control-item" to="communityManager"><i className="fa fa-object-ungroup"></i>社区管理</Link>
                </Menu.Item>
                <Menu.Item key="shopManager">
                    <Link className="control-item" to="shopManager"><i className="fa fa-shopping-basket"></i>电商管理</Link>
                </Menu.Item>
                <Menu.Item key="systemManager">
                    <Link className="control-item" to="systemManager"><i className="fa fa-cog"></i>系统管理</Link>
                </Menu.Item>
            </Menu>
            </div>
            </div>
        );
    }
});


module.exports = MiddleNav;
