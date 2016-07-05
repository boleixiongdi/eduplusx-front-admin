import React from 'react';
import { Modal, Form, Input, Button, Checkbox,Row, Col, Table, Icon, Select,
DatePicker, message, InputNumber, Radio, Cascader } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const confirm = Modal.confirm;


const SchoolAdminUserForm = React.createClass({
    getInitialState() {
        return {
          visible: false,
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
        let url= "schoolAdmin/list";
        let _data = {};
        let type = "get";
        this._ajax(url,type,_data);
        let role_url="role/list";
        this.role_ajax(role_url,type,_data);
        let school_url="school/list";
        this.school_ajax(school_url,type,_data);
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
        showModal() {
            this.setState({
              visible: true,
              roleId:"请选择",
              schoolId:"请选择"
            });
        },
        hideModal() {
            console.log('点击了取消');
            this.setState({
              visible: false
            });
        },
        _ajax(url,type,_data){
            $.ajax({
                url: url,
                dataType: 'json',
                type: type,
                data: _data,
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                  this.props.callbackParent();
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

    handleSubmit() {
      this.props.form.validateFields((errors, values) => {
      console.log(values);
        if (!!errors) {
          console.log('Errors in form!!!');
          return;
        }
        this.setState({ visible: false });
        let url= "schoolAdmin/save";
        let _data = {name:values.name,mobile:values.mobile,roleId:values.roleId,schoolId:values.schoolId};
        let type = "get";
        this._ajax(url,type,_data);
      });
    },

    render() {
        const { getFieldProps } = this.props.form;

        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        };
        const nameProps = getFieldProps('name', {
          rules: [
            { required: true, message: '用户名不能为空' }
          ],
        });
        const mobileProps = getFieldProps('mobile', {
          rules: [
            { required: true, message: '手机号不能为空' }
          ],
        });
        const roleIdProps = getFieldProps('roleId', {
          rules: [
            { required: true, message: '角色不能为空' }
          ],
        });
        const schoolIdProps = getFieldProps('schoolId', {
          rules: [
            { required: true, message: '学校不能为空' }
          ],
        });

        let roles = this.state.roleData;
        let roleList = roles.map(role => <Option value= {role.id+""} >{role.name}</Option>);
        let schools = this.state.schoolData;
        let schoolList = schools.map(school => <Option value= {school.pkid+""} >{school.school_name}</Option>);

        return (
            <div>
                <Button type="primary" onClick={this.showModal} className="add-btn">新增学校超级管理员</Button>
                <Modal title="新增学校超级管理员" visible={this.state.visible}
                onOk={this.handleSubmit} onCancel={this.hideModal}>
                  <Form horizontal form={this.props.form}>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="用户名：">
                      <Input id="name" {...nameProps} type="text" placeholder="用户名" />
                    </FormItem>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="手机号：">
                      <Input id="mobile" {...mobileProps} type="text" placeholder="手机号" />
                    </FormItem>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="用户角色：">
                      <Select id="roleId" {...roleIdProps} placeholder="请选择角色" style={{ width: '100%' }}>
                          {roleList}
                      </Select>
                    </FormItem>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="学校：">
                      <Select id="schoolId" {...schoolIdProps} placeholder="请选择学校" style={{ width: '100%' }}>
                          {schoolList}
                      </Select>
                    </FormItem>
                    <div className="cl"></div>
                    <FormItem className="formitem"
                      wrapperCol={{ span: 12, offset: 7 }} >
                      <Button type="ghost" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    <div className="cl"></div>
                  </Form>
                </Modal>
        </div>
        );
    },
});

module.exports = SchoolAdminUserForm;
