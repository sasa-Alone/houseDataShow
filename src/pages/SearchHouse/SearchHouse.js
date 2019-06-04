import React, { Component } from 'react';
import { Input,Row, Col, Form, Button, Radio, Table, Divider, Tag } from 'antd';
import styles from "./SearchHouse.less";
import { connect } from 'dva';
import Util from '../../utils'
const { Search } = Input;

@connect(({ searchHouse, loading,user })=> {
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
      render:(text,record)=>{
        return `${text}居室`
      }
    },
    {
      title: '面积（平方）',
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
      className:'tags',
      render:(text,record)=>{
        let arr = []
        for (let i in text) {
            arr.push(text[i]); //属性
        }
        return arr.map(item=>(<Tag color="blue">{item}</Tag>) )
      }
    },
    {
      title: '操作',
      dataIndex: 'link',
      render: (text, record) => {
        if(record.colStatus){
          return (
            <span>
              <a href= {record.link}>详情</a>
              <Divider type="vertical" />
              <a href="#"
              onClick={(e)=>{
                const {dispatch} = this.props;
                console.log("collection",record)
                dispatch({
                  type:"user/unCollection",
                  payload:{
                    house:record,
                  }
                })
              }}>取消收藏</a>
            </span>
          )
        }else{
          return (
            <span>
              <a href= {record.link}>详情</a>
              <Divider type="vertical" />
              <a href="#"
              onClick={(e)=>{
                const {dispatch} = this.props;
                console.log("collection",record)
                dispatch({
                  type:"searchHouse/addCollection",
                  payload:{
                    house:record,
                  }
                })
              }}>收藏</a>
            </span>
          )
        }

      },
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
    // const {dispatch} = this.props;
    // dispatch({
    //   type:"searchHouse/export",
    // })
    let data = [
      {
        "_id": "5cf4db41aea0b427f444c8d0",
        "platform": "自如",
        "title": "友家 · 湘湖家园3居室-南卧",
        "link": "//hz.ziroom.com/z/vr/61654409.html",
        "special": [
          "非首次出租",
          "房屋空气质量：已检测",
          "离地铁近",
          "独立阳台",
          "友家4.0 木棉"
        ],
        "size": "25",
        "floor": "6/6层",
        "model": "3",
        "address": "距1号线湘湖站步行约942米",
        "price": 1309,
        "type": "合租"
      },
      {
        "_id": "5cf4db41aea0b427f444c8d1",
        "platform": "自如",
        "title": "友家 · 保利叶之林(一期)4居室-南卧",
        "link": "//sh.ziroom.com/z/vr/61084747.html",
        "special": [
          "非首次出租",
          "离地铁近",
          "独立阳台",
          "友家4.0 木棉"
        ],
        "size": "12",
        "floor": "05/14层",
        "model": "4",
        "address": "距7号线祁华路站步行约689米",
        "price": 1111,
        "type": "合租"
      }
    ]
    Util.exportExcel(data)
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
                  {getFieldDecorator('platform', { initialValue: '' })(
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="">不限</Radio.Button>
                      <Radio.Button value="自如">自如</Radio.Button>
                      <Radio.Button value="蛋壳公寓">蛋壳公寓</Radio.Button>
                    </Radio.Group>
                  )}
              </Form.Item>
            </Col>
            <Col md={12} >
              <Form.Item label="类型" {...formItemShortLayouts}>
                  {getFieldDecorator('type', { initialValue: '' })(
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="">不限</Radio.Button>
                      <Radio.Button value="整租">整租</Radio.Button>
                      <Radio.Button value="合租">合租</Radio.Button>
                    </Radio.Group>
                  )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Form.Item label="区域" {...formItemLayout}>
                  {getFieldDecorator('area', { initialValue: '' })(
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="">不限</Radio.Button>
                      <Radio.Button value="上城">上城</Radio.Button>
                      <Radio.Button value="下城">下城</Radio.Button>
                      <Radio.Button value="余杭">余杭</Radio.Button>
                      <Radio.Button value="拱墅">拱墅</Radio.Button>
                      <Radio.Button value="江干">江干</Radio.Button>
                      <Radio.Button value="滨江">滨江</Radio.Button>
                      <Radio.Button value="萧山">萧山</Radio.Button>
                      <Radio.Button value="西湖">西湖</Radio.Button>
                      <Radio.Button value="钱塘新区">钱塘新区</Radio.Button>
                    </Radio.Group>
                  )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Form.Item label="租金" {...formItemLayout}>
              {getFieldDecorator('price', { initialValue: '' })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="">不限</Radio.Button>
                  <Radio.Button value="0-500">1500以下</Radio.Button>
                  <Radio.Button value="1500-2000">1500-2000</Radio.Button>
                  <Radio.Button value="2000-3000">2000-3000</Radio.Button>
                  <Radio.Button value="3000-5000">3000-5000</Radio.Button>
                  <Radio.Button value="5000-1000000">5000以上</Radio.Button>
                </Radio.Group>
              )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Form.Item label="居室" {...formItemLayout}>
              {getFieldDecorator('model', { initialValue: '' })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="">不限</Radio.Button>
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
              {getFieldDecorator('size', { initialValue: '' })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="">不限</Radio.Button>
                  <Radio.Button value="0-40">
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
                  <Radio.Button value="100-10000">
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
              {getFieldDecorator('special', { initialValue: '' })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="">不限</Radio.Button>
                  <Radio.Button value="独立卫生间">离地铁近</Radio.Button>
                  <Radio.Button value="独立阳台">独立阳台</Radio.Button>
                  <Radio.Button value="智能锁">智能锁</Radio.Button>
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
        <Table rowSelection={rowSelection} columns={this.columns} dataSource={dataSource} rowKey="_id"/>
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
