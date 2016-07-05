import React from 'react';
import { Modal, Form, Input, Button, Checkbox,Row, Col, Table, Icon, Select,
DatePicker, message, InputNumber, Radio, Cascader } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const confirm = Modal.confirm;

import RaisedButton from 'material-ui/lib/raised-button';

const SchoolManagerForm = React.createClass({
    getInitialState() {
        return {
          visible: false,
          data : [],
          pagination: {},
          loading: false,
          areaData:[],
        };
    },

    componentDidMount: function() {
        this.setState({ loading: true });
        let url= "school/list";
        let _data = {};
        let type = "get";
        this._ajax(url,type,_data);
        let areaUrl= "school/areaList";
        this.area_ajax(areaUrl,type,_data);
    },
    area_ajax(url,type,_data){
        $.ajax({
            url: url,
            dataType: 'json',
            type: type,
            data: _data,
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              this.setState({
                areaData: data,
              });

            }.bind(this),
            error: function(xhr, status, err) {
              console.error(url, status, err.toString());
            }.bind(this)
        });
    },

    showModal() {
      this.setState({ visible: true });
    },

    hideModal() {
      this.setState({ visible: false });
    },

    handleReset(e) {
      e.preventDefault();
      this.props.form.resetFields();
    },

    handleSubmit() {
      this.props.form.validateFields((errors, values) => {
        if (!!errors) {
          console.log('Errors in form!!!');
          return;
        }
        this.setState({ visible: false });
        let url= "school/save";
        let _data = {school_no:values.school_no,school_name:values.school_name,school_addr:values.school_addr,
        school_email_phone:values.school_email_phone,principal:values.principal,
        principal_tel:values.principal_tel,school_descr:values.school_descr,
        school_logo:values.school_logo,area_code:this.state.area_code};
        let type = "post";
        this._ajax(url,type,_data);
      });
    },
    area_codeChange(value){
          this.setState({
            area_code: value,
          });
      },
    _ajax(url,type,_data){
        $.ajax({
            url: url,
            dataType: 'json',
            type: type,
            data: _data,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function(data) {
              this.props.callbackParent();
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

    render() {
      const { getFieldProps } = this.props.form;

      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      };

      const school_noProps = getFieldProps('school_no', {
        rules: [
          { required: true, message: '学校编号不能为空' }
        ],
      });
      const school_nameProps = getFieldProps('school_name', {
        rules: [
          { required: true, message: '学校名称不能为空' }
        ],
      });
      const school_addrProps = getFieldProps('school_addr', {
        rules: [
          { required: true, message: '学校地址不能为空' }
        ],
      });
      const school_email_phoneProps = getFieldProps('school_email_phone', {
        rules: [
          { required: true, message: '联系信息不能为空' }
        ],
      });
      const school_descrProps = getFieldProps('school_descr', {
        rules: [
          { required: true, message: '学校介绍不能为空' }
        ],
      });
      const principalProps = getFieldProps('principal', {
        rules: [
          { required: true, message: '校长不能为空' }
        ],
      });
      const principal_telProps = getFieldProps('principal_tel', {
        rules: [
          { required: true, message: '校长电话不能为空' }
        ],
      });
      const school_logoProps = getFieldProps('school_logo', {
        rules: [
          { required: true, message: '学校网址不能为空' }
        ],
      });
      let areas = this.state.areaData;
      let areaList = areas.map(region => <Option value= {region.region_id} >{region.region_name}</Option>);

      return (
          <div>
              <Button type="primary" onClick={this.showModal} className="add-btn">新增学校</Button>
              <Modal title="新增学校" visible={this.state.visible}
              onOk={this.handleSubmit} onCancel={this.hideModal}>
                <Form horizontal form={this.props.form}>
                  <FormItem className="formitem"
                    {...formItemLayout}
                    label="学校编号：">
                    <Input id="school_no" {...school_noProps} type="text" placeholder="学校编号" />
                  </FormItem>
                  <FormItem className="formitem"
                    {...formItemLayout}
                    label="学校名称：">
                    <Input id="school_name" {...school_nameProps} type="text" placeholder="学校名称" />
                  </FormItem>
                  <FormItem className="formitem"
                    {...formItemLayout}
                    label="学校地址：">
                    <Input id="school_addr" {...school_addrProps} type="text" placeholder="学校地址" />
                  </FormItem>
                  <FormItem className="formitem"
                    {...formItemLayout}
                    label="联系信息：">
                    <Input id="school_email_phone" {...school_email_phoneProps} type="text" placeholder="联系信息" />
                  </FormItem>
                  <FormItem className="formitem"
                    {...formItemLayout}
                    label="校长：">
                    <Input id="principal" {...principalProps} type="text" placeholder="校长" />
                  </FormItem>
                  <FormItem className="formitem"
                    {...formItemLayout}
                    label="校长电话：">
                    <Input id="principal_tel" {...principal_telProps} type="text" placeholder="校长电话" />
                  </FormItem>
                  <div className="search-lb">
                        <label>所属区域：</label>
                  </div>
                  <Col span="8">
                    <Select id="area_code" style={{ width: '100%' }} defaultValue="0" value={this.state.area_code} onChange={this.area_codeChange}>
                        {areaList}
                    </Select>
                  </Col>
                  <FormItem className="formitem"
                    {...formItemLayout}
                    label="学校网址：">
                    <Input id="school_logo" {...school_logoProps} type="text" placeholder="学校网址" />
                  </FormItem>
                  <FormItem className="formitem"
                    {...formItemLayout}
                    label="学校介绍：">
                    <textarea style={{ width: 450 }} id="school_descr" {...school_descrProps} type="text" placeholder="学校介绍" />
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

module.exports = SchoolManagerForm;
