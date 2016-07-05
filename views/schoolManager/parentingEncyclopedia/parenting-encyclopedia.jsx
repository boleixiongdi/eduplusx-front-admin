import React from 'react';
import { Modal, Form, Input, Button, Checkbox,Row, Col, Table, Icon } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const confirm = Modal.confirm;
import ReactQuill from 'react-quill';
import RaisedButton from 'material-ui/lib/raised-button';
let _ParentingEncyclopediaForm = require('./parenting-encyclopedia-form.jsx');
let ParentingEncyclopediaForm = createForm()(_ParentingEncyclopediaForm);

const ParentingEncyclopedia = React.createClass({
    getInitialState() {
        return {
          visible: false,
          editVisible: false,
          data : [],
          pagination: {},
          loading: false,
          edit_content:"",
          gradeData:[],
        };
    },

    componentDidMount: function() {
        this.setState({ loading: true });
        this._getData();
    },

    _getData(){
        console.log("获取数据");
        let url= "parentingEncyclopedia/list";
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

    onTextChange: function(value) {
      this.setState({ edit_content:value });
      console.log(this.state.edit_content);
    },

    search(){
        console.log('点击了查询按钮');
        let url= "parentingEncyclopedia/list";
        let _data = {title:$("#search_title").val(), content:$("#search_content").val()};
        let type = "get";
        this._ajax(url,type,_data);
    },

    render() {
        self = this;
        function deleteConfirm(id,object) {
        let ss = id;
        console.log(ss);
          confirm({
            title: '您是否确认要删除这项内容',
            onOk() {
              console.log('点击了确定删除按钮');
              $.ajax({
                  url: "parentingEncyclopedia/delete/"+id,
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
          console.log(id);
          console.log('点击了编辑按钮');
          self.setState({editVisible: true});
          $.ajax({
              url: "parentingEncyclopedia/edit/"+id,
              dataType: 'json',
              type: "get",
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                self.setState({edit_content: data.content});
                console.log(data.length);
                console.log(data);
                $("#edit_title").val(data.title);
                $("#edit_id").val(data.id);
              }.bind(this),
              error: function(xhr, status, err) {
                console.error("/delete/"+id, status, err.toString());
              }.bind(this)
          });

        };
        function editSubmit() {
          console.log('点击了提交按钮');
          console.log(self);
          let url= "parentingEncyclopedia/edit";
          let _data = {id:$("#edit_id").val(),title:$("#edit_title").val(), content:self.state.edit_content};
          let type = "get";
          self._ajax(url,type,_data);

          self.setState({editVisible: false});
        };

        function editCancel(e) {
          console.log(e);
          self.setState({editVisible: false});
        };

        const columns = [{
            title: '标题',
            dataIndex: 'title',
            /*render(text) {
            return <a href="#">{text}</a>;
            }*/
        }, {
            title: '内容',
            dataIndex: 'content',
            width: "200"
        }, {
            title: '发布人',
            dataIndex: 'releaser'
        }, {
            title: '发布时间',
            dataIndex: 'createTime'
        }, {
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

        return (
            <div>
                <div className="console-title console-title-border">
                    <h5>育儿百科管理</h5>
                    <div className="console-add">
                        <ParentingEncyclopediaForm callbackParent={this._getData} />
                    </div>
                </div>
                <div className="search-wrap">
                    <div className="search-lb">
                        <label>标题：</label>
                    </div>
                    <Col span="4">
                    <Input placeholder="标题" id="search_title" />
                    </Col>

                    <div className="search-lb">
                        <label>内容：</label>
                    </div>
                    <Col span="10">
                        <Input placeholder="内容" id="search_content" />
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

                <Modal title="编辑育儿百科信息" visible={this.state.editVisible}
                  onOk={editSubmit} onCancel={editCancel}>
                  <div className="e-row">
                    <div className="search-lb">
                        <label>标题：</label>
                    </div>
                    <Col span="10">
                    <Input id="edit_id" type="hidden" />
                    <Input id="edit_title" placeholder="标题" />
                    </Col>
                  </div>
                  <div className="e-row-no">
                    <ReactQuill theme="snow"
                      value={this.state.edit_content}
                      onChange={this.onTextChange} />
                  <div className="cl"></div>
                  </div>
                </Modal>
        </div>
        );
    },
});

module.exports = ParentingEncyclopedia;
