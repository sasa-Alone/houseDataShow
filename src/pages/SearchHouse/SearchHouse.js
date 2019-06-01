import React, { Component } from 'react';
import { Input,Row, Col, Form, Button, Radio, Table, Divider } from 'antd';
import styles from "./SearchHouse.less";
import { connect } from 'dva';

const { Search } = Input;

@connect(({ searchHouse, loading })=> {
  return ({
    selectedRowKeys: searchHouse.selectedRowKeys,
    dataSource: searchHouse.houseList,
    selectedRows: searchHouse.selectedRows,
    selectConditons: searchHouse.selectConditons,
    loading: loading.effects['searchHouse/getHouseList'],
  })
})
@Form.create()
class SearchHouse extends Component {

  columns = [
    {
      title: '平台名称',
      dataIndex: 'platform',
      filters: [
        {
          text: '自如',
          value: '自如',
        },
        {
          text: '蛋壳公寓',
          value: '蛋壳公寓',
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.platform.indexOf(value) === 0,
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '租金',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '户型',
      dataIndex: 'model',
    },
    {
      title: '面积',
      dataIndex: 'size',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.size - b.size,
    },
    {
      title: '区域',
      dataIndex: 'area',
    },
    {
      title: '特色',
      dataIndex: 'special',
    },
    {
      title: '操作',
      dataIndex: 'link',
      render: (text, record) => (
        <span>
          <a href= {record.link}>详情</a>
          <Divider type="vertical" />
          <Button type="link"
          onClick={(e)=>{
            const {dispatch} = this.props;
            console.log(record)
            dispatch({
              type:"searchHouse/addCollection",
              payload:{
                house:record,
              }
            })
          }}>收藏</Button>
        </span>
      ),
    },
  ];

  constructor(props){
    super(props);

    this.handleFetch = this.handleFetch.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:"searchHouse/getHouseList",
    });
  }

  handleFetch = () => {
    const { dispatch } = this.props;
    dispatch({
      type:"searchHouse/getHouseList",
    });
  };

  handleSelectChange = (selectedRowKeys,selectedRows) => {
    const { dispatch } = this.props;
    console.log("selectedRowKeys",selectedRows)
    dispatch({
      type:"searchHouse/save",
      payload: {
        selectedRowKeys,
        selectedRows,
      }
    });
  };

  hanldeChange = (e) => {
    console.log(e)
  }

  handleSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type:"searchHouse/fetchHouses",
          payload:{
            selectConditons:values,
          }
        });
      }
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  handleExport = () =>{
    const {dispatch} = this.props;
    dispatch({
      type:"searchHouse/export",
    })
  }

  handleAnalysis = () => {
    const {dispatch} = this.props;
    dispatch({
      type:"searchHouse/analysis",
    })
  }

  renderForm(){
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 1 },
      wrapperCol: { span: 17 },
    };
    const formItemShortLayouts = {
      labelCol: { span: 2 },
      wrapperCol: { span: 16 },
    };
    return(
      <Form className="form" onSubmit={this.handleSubmit}>
          <Row>
            <Col md={12}>
              <Form.Item label="平台" {...formItemShortLayouts} >
                  {getFieldDecorator('platform', { initialValue: 'no' })(
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="no">不限</Radio.Button>
                      <Radio.Button value="ziru">自如</Radio.Button>
                      <Radio.Button value="danke">蛋壳</Radio.Button>
                    </Radio.Group>
                  )}
              </Form.Item>
            </Col>
            <Col md={12} >
              <Form.Item label="类型" {...formItemShortLayouts}>
                  {getFieldDecorator('type', { initialValue: 'no' })(
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="no">不限</Radio.Button>
                      <Radio.Button value="full">整租</Radio.Button>
                      <Radio.Button value="shared">合租</Radio.Button>
                    </Radio.Group>
                  )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Form.Item label="区域" {...formItemLayout}>
                  {getFieldDecorator('area', { initialValue: 'no' })(
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="no">不限</Radio.Button>
                      <Radio.Button value="shangcheng">上城</Radio.Button>
                      <Radio.Button value="xiacheng">下城</Radio.Button>
                      <Radio.Button value="yuhang">余杭</Radio.Button>
                      <Radio.Button value="gongshu">拱墅</Radio.Button>
                      <Radio.Button value="jianggan">江干</Radio.Button>
                      <Radio.Button value="bingjiang">滨江</Radio.Button>
                      <Radio.Button value="xiaoshan">萧山</Radio.Button>
                      <Radio.Button value="xihu">西湖</Radio.Button>
                      <Radio.Button value="qiantang">钱塘新区</Radio.Button>
                    </Radio.Group>
                  )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Form.Item label="租金" {...formItemLayout}>
              {getFieldDecorator('price', { initialValue: 'no' })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="no">不限</Radio.Button>
                  <Radio.Button value="1500">1500以下</Radio.Button>
                  <Radio.Button value="1500-2000">1500-2000</Radio.Button>
                  <Radio.Button value="2000-3000">2000-3000</Radio.Button>
                  <Radio.Button value="3000-5000">3000-5000</Radio.Button>
                  <Radio.Button value="5000">5000以上</Radio.Button>
                </Radio.Group>
              )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Form.Item label="居室" {...formItemLayout}>
              {getFieldDecorator('model', { initialValue: 'no' })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="no">不限</Radio.Button>
                  <Radio.Button value="1">1居室</Radio.Button>
                  <Radio.Button value="2">2居室</Radio.Button>
                  <Radio.Button value="3">3居室</Radio.Button>
                  <Radio.Button value="4">4居室</Radio.Button>
                  <Radio.Button value=">4">4居室以上</Radio.Button>
                </Radio.Group>
              )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Form.Item label="面积" {...formItemLayout}>
              {getFieldDecorator('size', { initialValue: 'no' })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="no">不限</Radio.Button>
                  <Radio.Button value="40">
                    40m<sup>2</sup>以下
                  </Radio.Button>
                  <Radio.Button value="40-60">
                    40m<sup>2</sup>-60m<sup>2</sup>
                  </Radio.Button>
                  <Radio.Button value="60-80">
                    60m<sup>2</sup>-80m<sup>2</sup>
                  </Radio.Button>
                  <Radio.Button value="80-100">
                    80m<sup>2</sup>-100m<sup>2</sup>
                  </Radio.Button>
                  <Radio.Button value=">100">
                    100m<sup>2</sup>以上
                  </Radio.Button>
                </Radio.Group>
              )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={13} style={{marginLeft:-4}}>
              <Form.Item label="特色" {...formItemShortLayouts}>
              {getFieldDecorator('special', { initialValue: 'no' })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="no">不限</Radio.Button>
                  <Radio.Button value="cesuo">独立卫生间</Radio.Button>
                  <Radio.Button value="yangtai">独立阳台</Radio.Button>
                  <Radio.Button value="suo">智能锁</Radio.Button>
                </Radio.Group>
              )}
              </Form.Item>
            </Col>
            <Col md={11}>
            </Col>
          </Row>
          <Form.Item>

          <div style={{ overflow: 'hidden' }}>
            <div style={{ marginBottom: 24 , marginTop: 24}}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </div>
          </div>
          </Form.Item>

        </Form>
    )
  }

  renderTable(){
    const { dataSource, loading, selectedRowKeys } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return(
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.handleFetch} disabled={!hasSelected} loading={loading}>
            重新加载
          </Button>
          <Button onClick={this.handleExport} type="primary" style={{marginLeft: 16}}>
            批量导出
          </Button>
          <Button onClick={this.handleAnalysis} type="primary" style={{marginLeft: 16}}>
            数据分析
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选 ${selectedRowKeys.length} 条数据` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={this.columns} dataSource={dataSource} />
      </div>
    )
  }

  render() {
    return(
      <div className={styles.root}>
        <Row>
          <Col span={1}></Col>
          <Col span={8}>
            <Search
              placeholder="请输入关键词搜索：如地址/小区等"
              enterButton
              onSearch={value => console.log(value)}
            />
          </Col>
        </Row>
        {this.renderForm()}
        {this.renderTable()}
      </div>
    );
  }
}

export default SearchHouse;
