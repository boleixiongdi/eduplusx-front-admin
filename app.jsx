import 'antd/lib/index.css';
let React = require('react');
let ReactDOM = require('react-dom');
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
let Router = require('react-router');
let { Route, Redirect, RouteHandler, Link ,DefaultRoute} = Router;
let TopNav = require('./views/common/top-nav.jsx');
let MiddleNav = require('./views/common/middle-nav.jsx');
/* 系统管理 */
let SystemManager = require('./views/system-manager.jsx');
let Permission = require('./views/systemManager/permission.jsx');
let Role = require('./views/systemManager/role.jsx');
let User = require('./views/systemManager/user.jsx');
let E_Menu = require('./views/systemManager/menu.jsx');
let Dict = require('./views/systemManager/dict.jsx');
let UserCenter = require('./views/systemManager/user-center.jsx');


let Message = require('./views/message.jsx');
/* 学校管理 */
let AllSchoolManager = require('./views/school-manager.jsx');
let ParentingEncyclopedia = require('./views/schoolManager/parentingEncyclopedia/parenting-encyclopedia.jsx');
let SchoolAdminUser = require('./views/schoolManager/school/school-admin-user.jsx');
let SchoolManager = require('./views/schoolManager/school/school-manager.jsx');

/* 公告管理 */
let Announcement = require('./views/announcement/announcement.jsx');
/* 考勤管理 */
let StudentAttendance = require('./views/attendance/student-attendance.jsx');
let TeacherAttendance = require('./views/attendance/teacher-attendance.jsx');
/* 班级管理 */
let ClazzInfo = require('./views/clazz/clazz-info.jsx');
/* 教师管理 */
let TeacherInfo = require('./views/teacher/teacher-info.jsx');
/* 学生管理 */
let StudentInfo = require('./views/student/student-info.jsx');
/* 课程管理 */
let CourseInfo = require('./views/course/course-info.jsx');
/* 年级管理 */
let GradeInfo = require('./views/grade/grade-info.jsx');
/* 食谱管理 */
let RecipeInfo = require('./views/recipe/recipe-info.jsx');

/* 电商管理 */
let ShopManager = require('./views/shop-manager.jsx');

/* 社区管理 */
let CommunityManager = require('./views/community-manager.jsx');

const App = React.createClass({
  getInitialState() {
    return {
      current: 'mail'
    };
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  },
  render() {
    return (
        <div>
          <TopNav></TopNav>
          <MiddleNav></MiddleNav>
          <RouteHandler />
        </div>
    );
  }
});

var routes = (
    <Route path="/" handler={App}>

      <Route name="systemManager" path="/sys" handler={SystemManager}>
        <Route name="role" path="/sys/role" handler={Role}></Route>
        <Route name="user" path="/sys/user" handler={User}></Route>
        <Route name="menu" path="/sys/menu" handler={E_Menu}></Route>
        <Route name="dict" path="/sys/dict" handler={Dict}></Route>
        <Route name="userCenter" path="/sys/user/center" handler={UserCenter}></Route>

      </Route>
      <Route name="allSchoolManager" path="/school" handler={AllSchoolManager}>
        <Route name="parentingEncyclopedia" path="/school/parentingEncyclopedia" handler={ParentingEncyclopedia}></Route>
        <Route name="schoolAdminUser" path="/school/schoolAdminUser" handler={SchoolAdminUser}></Route>
        <Route name="schoolManager" path="/school/schoolManager" handler={SchoolManager}></Route>
        <Route name="announcement" path="/school/announcement" handler={Announcement}></Route>
        <Route name="studentAttendance" path="/school/attendance/student" handler={StudentAttendance}></Route>
        <Route name="teacherAttendance" path="/school/attendance/teacher" handler={TeacherAttendance}></Route>
        <Route name="teacherInfo" path="/school/teacher" handler={TeacherInfo}></Route>
        <Route name="studentInfo" path="/school/student" handler={StudentInfo}></Route>
        <Route name="clazzInfo" path="/school/clazz" handler={ClazzInfo}></Route>
        <Route name="courseInfo" path="/school/course" handler={CourseInfo}></Route>
        <Route name="gradeInfo" path="/school/grade" handler={GradeInfo}></Route>
        <Route name="recipeInfo" path="/school/recipe" handler={RecipeInfo}></Route>
      </Route>
      <Route name="shopManager" path="/shop" handler={ShopManager}>
        <Route name="shopannouncement" path="/shop/announcement/" handler={Announcement}></Route>
        <Route name="shopstudentAttendance" path="/shop/attendance/student" handler={StudentAttendance}></Route>
      </Route>
      <Route name="communityManager" path="/community" handler={CommunityManager}>
        <Route name="communityannouncement" path="/community/announcement/" handler={Announcement}></Route>
        <Route name="communitystudentAttendance" path="/community/attendance/student" handler={StudentAttendance}></Route>
      </Route>
      <DefaultRoute handler={Message}/>
    </Route>
);

Router.run(routes, function (Handler) {
  ReactDOM.render(<Handler/>, document.getElementById('app'));
});
