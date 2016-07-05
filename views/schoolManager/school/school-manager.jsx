import React from 'react';
import { Modal, Form, Input, Button, Checkbox,Row, Col, Table, Icon, Select,
DatePicker, message, InputNumber, Radio, Cascader } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const confirm = Modal.confirm;
import RaisedButton from 'material-ui/lib/raised-button';

let _SchoolManagerForm = require('./school-manager-form.jsx');
let SchoolManagerForm = createForm()(_SchoolManagerForm);

const SchoolManager = React.createClass({
    getInitialState() {
        return {
          editVisible: false,
          errorVisible:false,
          data : [],
          areaData:[],
          pagination: {},
          loading: false,
        };
    },

    componentDidMount: function() {
        this.setState({ loading: true });
        this._getData();

        let _data = {};
        let type = "get";
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
    _getData(){
        console.log("获取数据");
        let url= "school/list";
        let _data = {};
        let type = "get";
        this._ajax(url,type,_data);
    },

    _ajax(url,type,_data){
        $.ajax({
            url: url,
            dataType: 'json',
            type: type,
            data: _data,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function(data) {
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
    area_codeChange(value){
          this.setState({
            edit_area_code: value,
          });
      },
    search(){
        let url= "school/list";
        let _data = {school_name:$("#search_schoolName").val()};
        let type = "get";
        this._ajax(url,type,_data);
    },

    render() {

        self = this;
        function deleteConfirm(id,object) {
          confirm({
            title: '您是否确认要删除这项内容',
            onOk() {
              $.ajax({
                  url: "school/delete/"+id,
                  dataType: 'json',
                  type: "get",
                  contentType: "application/json; charset=utf-8",
                  success: function(data) {
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
              url: "school/edit/"+id,
              dataType: 'json',
              type: "get",
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                $("#edit_school_no").val(data.school_no);
                $("#edit_school_name").val(data.school_name);
                $("#edit_pkid").val(data.pkid);
                $("#edit_school_addr").val(data.school_addr);
                $("#edit_school_email_phone").val(data.school_email_phone);
                $("#edit_principal").val(data.principal);
                $("#edit_principal_tel").val(data.principal_tel);
                $("#edit_school_descr").val(data.school_descr);
                $("#edit_school_logo").val(data.school_logo);
                self.setState({
                    edit_area_code:"370701",
                });
              }.bind(this),
              error: function(xhr, status, err) {
                console.error("/delete/"+id, status, err.toString());
              }.bind(this)
          });

        };

        function editSubmit() {
            if($("#schoolName").val()==""||$("#address").val()==""
            ||$("#contactInformation").val()==""||$("#briefIntroduction").val()==""){
              self.setState({errorVisible: true});
              return;
            }
            let url= "school/edit";
            let _data = {pkid:$("#edit_pkid").val(),school_no:$("#edit_school_no").val(),
            school_name:$("#edit_school_name").val(),area_code:self.state.edit_area_code,
            school_logo:$("#edit_school_logo").val(),principal:$("#edit_principal").val(),
            principal_tel:$("#edit_principal_tel").val(),school_addr:$("#edit_school_addr").val(),
            school_descr:$("#edit_school_descr").val(),school_email_phone:$("#edit_school_email_phone").val()};
            let type = "post";
            self._ajax(url,type,_data);
            self.setState({editVisible: false});
        };

        function editCancel(e) {
          console.log(e);
          self.setState({editVisible: false});
        };
        function errorCancel(e) {
          self.setState({errorVisible: false});
        };

        const columns = [{
            title: '学校名称',
            dataIndex: 'school_name',
        },{
            title: '学校地址',
            dataIndex: 'school_addr',
        },{
            title: '学校介绍',
            dataIndex: 'school_descr',
        },{
            title: '联系信息',
            dataIndex: 'school_email_phone',
        },{
            title: '操作',
            key: 'operation',
            render(text, record) {
              return (
                <span className="operation-cl">
                  <i className="fa fa-pencil fa-fw"></i><a onClick={showEditModal.bind(this,record.pkid)} value={record.pkid} >编辑</a>
                  <span className="ant-divider"></span>
                  <i className="fa fa-trash-o fa-fw"></i><a onClick={deleteConfirm.bind(this,record.pkid)} value={record.pkid}>删除</a>
                </span>
              );
            }
        }];

        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        };
        let areas = this.state.areaData;
        let areaList = areas.map(region => <Option key={region.region_id} value= {region.region_id} >{region.region_name}</Option>);


        return (
            <div>
                <div className="console-title console-title-border">
                    <h5>学校管理</h5>
                    <div className="console-add">
                        <SchoolManagerForm callbackParent={this._getData} />
                    </div>
                </div>
                <div className="search-wrap">
                    <div className="search-lb">
                        <label>学校名称：</label>
                    </div>
                    <Col span="4">
                    <Input placeholder="学校名称" id="search_schoolName" />
                    </Col>
                    <div className="search-qr">
                        <Button type="primary" onClick={this.search} >查询</Button>
                    </div>
                    <div className="cl"></div>
                </div>

                <div className="">
                    <Table columns={columns} dataSource={this.state.data}
                                             pagination={this.state.pagination}
                                             loading={this.state.loading}/>
                </div>

                <Modal title="编辑学校信息" visible={this.state.editVisible}
                onOk={editSubmit} onCancel={editCancel}>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="学校编号：">
                      <Input id="edit_school_no"  type="text" placeholder="学校编号" />
                    </FormItem>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="学校名称：">
                      <Input id="edit_pkid" type="hidden" />
                      <Input id="edit_school_name" type="text" placeholder="学校名称" />
                    </FormItem>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="学校地址：">
                      <Input id="edit_school_addr"  type="text" placeholder="学校地址" />
                    </FormItem>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="联系信息：">
                      <Input id="edit_school_email_phone"  type="text" placeholder="联系信息" />
                    </FormItem>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="校长：">
                      <Input id="edit_principal"  type="text" placeholder="校长" />
                    </FormItem>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="校长电话：">
                      <Input id="edit_principal_tel"  type="text" placeholder="校长电话" />
                    </FormItem>
                    <div className="search-lb">
                          <label>所属区域：</label>
                    </div>
                    <Col span="8">
                      <Select id="edit_area_code" style={{ width: '100%' }} defaultValue="0" value={this.state.edit_area_code} onChange={this.area_codeChange}>
                          {areaList}
                      </Select>
                    </Col>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="学校网址：">
                      <Input id="edit_school_logo" type="text" placeholder="学校网址" />
                    </FormItem>
                    <FormItem className="formitem"
                      {...formItemLayout}
                      label="学校介绍：">
                      <textarea style={{ width: 450 }} id="edit_school_descr"  type="text" placeholder="学校介绍" />
                    </FormItem>
                    <div className="cl"></div>
                </Modal>
                <Modal title="提示信息" visible={this.state.errorVisible}
                onCancel={errorCancel} onOk={errorCancel} >
                    <div>
                        <div>学校姓名、学校地址、联系信息、学校介绍不能为空！</div>
                    </div>
                </Modal>
        </div>
        );
    },
});

module.exports = SchoolManager;
