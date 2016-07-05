import React from 'react';
import { Modal, Form, Input, Button, Checkbox,Row, Col, Table, Icon, Select,
DatePicker, message, InputNumber, Radio, Cascader } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const confirm = Modal.confirm;
import RaisedButton from 'material-ui/lib/raised-button';
let _SchoolAdminUserForm = require('./school-admin-form.jsx');
let SchoolAdminUserForm = createForm()(_SchoolAdminUserForm);

const SchoolAdminUser = React.createClass({
    getInitialState() {
        return {
          editVisible: false,
          data : [],
          pagination: {},
          loading: false,
          roleData : [],
          schoolData : [],
          roleId:"请选择",
          schoolId:"请选择",
        };
    },

    componentDidMount: function() {
        this.setState({ loading: true });
        this._getData();
    },

    _getData(){
        console.log("获取数据");
        let url= "schoolAdmin/list";
        let _data = {};
        let type = "get";
        this._ajax(url,type,_data);
        let role_url="role/list";
        this.role_ajax(role_url,type,_data);
        let school_url="school/list";
        this.school_ajax(school_url,type,_data);
    },

    _ajax(url,type,_data){
        $.ajax({
            url: url,
            dataType: 'json',
            type: type,
            data: _data,
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              console.log(data.length);
              console.log(data);
              const pagination = this.state.pagination;
              pagination.total = data.totalCount;
              this.setState({
                loading: false,
                data: data,
                pagination,
              });

            }.bind(this),
            error: function(xhr, status, err) {
              console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    role_ajax(url,type,_data){
        $.ajax({
            url: url,
            dataType: 'json',
            type: type,
            data: _data,
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              this.setState({
                roleData: data,
              });
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    school_ajax(url,type,_data){
        $.ajax({
            url: url,
            dataType: 'json',
            type: type,
            data: _data,
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              this.setState({
                schoolData: data,
              });

            }.bind(this),
            error: function(xhr, status, err) {
              console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    searchUsers(){
        console.log('点击了查询按钮');
        let url= "schoolAdmin/list";
        let _data = {name:$("#search_name").val(), mobile:$("#search_mobile").val()};
        let type = "get";
        this._ajax(url,type,_data);
    },
    handleEdit_schoolIdChange(value){
        this.setState({
          edit_schoolId: value,
        });
    },
    handleEdit_roleIdChange(value){
        this.setState({
          edit_roleId: value,
        });
    },
    render() {
        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        };
        self = this;
        function deleteConfirm(id,object) {
        let ss = id;
        console.log(ss);
          confirm({
            title: '您是否确认要删除这项内容',
            onOk() {
              console.log('点击了确定删除按钮');
              $.ajax({
                  url: "schoolAdmin/delete/"+id,
                  dataType: 'json',
                  type: "get",
                  contentType: "application/json; charset=utf-8",
                  success: function(data) {
                    console.log(data.length);
                    console.log(data);
                    const pagination = self.state.pagination;
                    pagination.total = data.totalCount;
                    self.setState({
                      loading: false,
                      data: data,
                      pagination,
                    });

                  }.bind(this),
                  error: function(xhr, status, err) {
                    console.error("/delete/"+id, status, err.toString());
                  }.bind(this)
              });
            },
            onCancel() {}
          });
        }

        function showEditModal(id,object) {
          self.setState({editVisible: true});
          $.ajax({
              url: "schoolAdmin/edit/"+id,
              dataType: 'json',
              type: "get",
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                $("#edit_name").val(data.name);
                $("#edit_mobile").val(data.mobile);
                $("#edit_id").val(data.id);
                $("#edit_roleId").val(data.roleId);
                self.setState({
                    edit_roleId:data.roles[0].id,
                    edit_schoolId: data.schoolId,
              });
              }.bind(this),
              error: function(xhr, status, err) {
                console.error("/delete/"+id, status, err.toString());
              }.bind(this)
          });

        };
        function editSubmit() {
          console.log('点击了提交按钮');
          console.log(self);
          let url= "schoolAdmin/edit";
          let _data = {id:$("#edit_id").val(),name:$("#edit_name").val(), mobile:$("#edit_mobile").val()
          , roleId:self.state.edit_roleId, schoolId:self.state.edit_schoolId};
          let type = "get";
          self._ajax(url,type,_data);

          self.setState({editVisible: false});
        };

        function editCancel(e) {
          console.log(e);
          self.setState({editVisible: false});
        };

        const columns = [{
            title: 'ID',
            dataIndex: 'id',
        }, {
            title: '姓名',
            dataIndex: 'name',
            /*render(text) {
            return <a href="#">{text}</a>;
            }*/
        }, {
            title: '电话',
                dataIndex: 'mobile'
        }, {
            title: '角色',
                dataIndex: 'roleType'
        }, {
            title: '学校',
                dataIndex: 'schoolId'
        },{
            title: '操作',
            key: 'operation',
            render(text, record) {
              return (
                <span className="operation-cl">
                  <i className="fa fa-pencil fa-fw"></i><a onClick={showEditModal.bind(this,record.id)} value={record.id} >编辑</a>
                  <span className="ant-divider"></span>
                  <i className="fa fa-trash-o fa-fw"></i><a onClick={deleteConfirm.bind(this,record.id)} value={record.id}>删除</a>
                </span>
              );
            }
        }];

        let roles = this.state.roleData;
        let roleList = roles.map(role => <Option value= {role.id} >{role.name}</Option>);
        let schools = this.state.schoolData;
        let schoolList = schools.map(school => <Option value= {school.id} >{school.schoolName}</Option>);

        return (
            <div>
                <div className="console-title console-title-border">
                    <h5>学校超级管理员管理</h5>
                    <div className="console-add">
                        <SchoolAdminUserForm callbackParent={this._getData} />
                    </div>
                </div>
                <div className="search-wrap">
                    <div className="search-lb">
                        <label>姓名：</label>
                    </div>
                    <Col span="4">
                    <Input placeholder="姓名" id="search_name" />
                    </Col>

                    <div className="search-lb">
                        <label>手机号：</label>
                    </div>
                    <Col span="4">
                        <Input placeholder="手机号" id="search_mobile" />
                    </Col>

                    <div className="search-qr">
                        <Button type="primary" onClick={this.searchUsers} >查询</Button>
                    </div>
                    <div className="cl"></div>
                </div>

                <div className="">
                    <Table columns={columns} dataSource={this.state.data}
                                             pagination={this.state.pagination}
                                             loading={this.state.loading}/>
                </div>

                <Modal title="编辑学校超级管理员" visible={this.state.editVisible}
                onOk={editSubmit} onCancel={editCancel}>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="用户邮箱：">
                      <Input id="edit_id" type="hidden" />
                      <Input id="edit_name" type="text" placeholder="用户邮箱" />
                    </FormItem>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="手机号：">
                      <Input id="edit_mobile" type="text" placeholder="手机号" />
                    </FormItem>
                    <Row>
                    <div className="search-lb">
                        <label>用户角色：</label>
                    </div>
                    <Col span="6">
                        <Select id="edit_roleId" style={{ width: '100%' }} defaultValue="-1" value={this.state.edit_roleId} onChange={this.handleEdit_roleIdChange}>
                            <Option value="-1">请选择角色</Option>
                            {roleList}
                        </Select>
                    </Col>
                    <div className="search-lb">
                        <label>学校：</label>
                    </div>
                    <Col span="6">
                        <Select id="edit_schoolId" style={{ width: '100%' }} defaultValue="-1" value={this.state.edit_schoolId} onChange={this.handleEdit_schoolIdChange}>
                            <Option value="-1">请选择学校</Option>
                            {schoolList}
                        </Select>
                    </Col>
                    <div className="cl"></div>
                    </Row>
                </Modal>
        </div>
        );
    },
});

module.exports = SchoolAdminUser;
