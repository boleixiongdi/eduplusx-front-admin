import 'react-quill/dist/quill.snow.css';
import React from 'react';
import { Modal, Form, Input, Button, Checkbox,Row, Col, Table, Icon, Select } from 'antd';
const confirm = Modal.confirm;
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
import ReactQuill from 'react-quill';
import RaisedButton from 'material-ui/lib/raised-button';

const ParentingEncyclopediaForm = React.createClass({
    getInitialState() {
        return {
          visible: false,
          editVisible: false,
          data : [],
          pagination: {},
          loading: false,
          text:"",
          gradeData:[],
        };
    },

    componentDidMount: function() {
        this.setState({ loading: true });
        let url= "parentingEncyclopedia/list";
        let _data = {};
        let type = "get";
        this._ajax(url,type,_data);
    },

    showModal() {
      this.setState({ visible: true });
      this.props.form.resetFields();
      this.state.text='';
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
        console.log('点击了保存按钮');
        let url= "parentingEncyclopedia/save";
        let _data = {title:values.title, content:this.state.text};
        let type = "post";
        this._ajax(url,type,_data);
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

    onTextChange: function(value) {
      this.setState({ text:value });
    },

    render() {

        const { getFieldProps } = this.props.form;

        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        };

        const titleProps = getFieldProps('title', {
          rules: [
            { required: true, message: '标题不能为空' }
          ],
        });

        return (
            <div>
                <Button type="primary" onClick={this.showModal} className="add-btn">新增育儿百科</Button>
                <Modal title="新增育儿百科" visible={this.state.visible}
                onOk={this.handleSubmit} onCancel={this.hideModal}>
                  <Form horizontal form={this.props.form}>
                  <div className="e-row-no">
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="标题：">
                      <Input id="title" {...titleProps} type="text" placeholder="标题" />
                    </FormItem>
                    <div className="cl"></div>
                  </div>
                  <div className="e-row-no">
                    <ReactQuill theme="snow"
                      value={this.state.text}
                      onChange={this.onTextChange} />
                  <div className="cl"></div>
                  </div>
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

module.exports = ParentingEncyclopediaForm;
