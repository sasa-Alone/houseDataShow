import React, { Component } from 'react';
import { Input,Row, Col, Form, Button, Radio, Select, Table  } from 'antd';
import styles from "./SearchHouse.less";
import { connect } from 'dva';

const Search = Input.Search;
const { Option } = Select;

const columns = [
  {
    title: '平台名称',
    dataIndex: 'platform',
    filters: [
      {
        text: '自如',
        value: 'ziru',
      },
      {
        text: '蛋壳公寓',
        value: 'danke',
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '租金',
    dataIndex: 'price',
    sorter: (a, b) => a.address.length - b.address.length,
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
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '朝向',
    dataIndex: 'renovations',
  },
  {
    title: '区域',
    dataIndex: 'area',
  },
  {
    title: '楼层',
    dataIndex: 'floor',
  },
  {
    title: '特色',
    dataIndex: 'special',
  },
  {
    title: '操作',
    dataIndex: 'link',
  },
];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

@connect(({ searchHouse })=> {

  console.log("searchHouse",searchHouse)
  return ({
    dataSource: searchHouse.houseList,
  })

})
class SearchHouse extends Component {

  // constructor(props){
  //   super(props);


  // }

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:"searchHouse/getHouseList",
    });
  }

  renderForm(){
    const formItemLayout = {
      labelCol: { span: 1 },
      wrapperCol: { span: 17 },
    };
    const formItemShortLayouts = {
      labelCol: { span: 2 },
      wrapperCol: { span: 16 },
    };
    return(
      <Form className="form">
          <Row>
            <Col md={12}>
              <Form.Item label="平台" {...formItemShortLayouts}>
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="no">不限</Radio.Button>
                    <Radio.Button value="ziru">自如</Radio.Button>
                    <Radio.Button value="danke">蛋壳</Radio.Button>
                  </Radio.Group>
              </Form.Item>
            </Col>
            <Col md={12} >
              <Form.Item label="类型" {...formItemShortLayouts}>
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="no">不限</Radio.Button>
                    <Radio.Button value="full">整租</Radio.Button>
                    <Radio.Button value="shared">合租</Radio.Button>
                  </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Form.Item label="区域" {...formItemLayout}>
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
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Form.Item label="租金" {...formItemLayout}>
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="no">不限</Radio.Button>
                    <Radio.Button value="1500">1500以下</Radio.Button>
                    <Radio.Button value="1500-2000">1500-2000</Radio.Button>
                    <Radio.Button value="2000-3000">2000-3000</Radio.Button>
                    <Radio.Button value="3000-5000">3000-5000</Radio.Button>
                    <Radio.Button value="5000">5000以上</Radio.Button>
                  </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Form.Item label="居室" {...formItemLayout}>
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="no">不限</Radio.Button>
                    <Radio.Button value="1">1居室</Radio.Button>
                    <Radio.Button value="2">2居室</Radio.Button>
                    <Radio.Button value="3">3居室</Radio.Button>
                    <Radio.Button value="4">4居室</Radio.Button>
                    <Radio.Button value=">4">4居室以上</Radio.Button>
                  </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Form.Item label="面积" {...formItemLayout}>
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
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={13}>
              <Form.Item label="特色" {...formItemShortLayouts}>
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="no">不限</Radio.Button>
                    <Radio.Button value="cesuo">独立卫生间</Radio.Button>
                    <Radio.Button value="yangtai">独立阳台</Radio.Button>
                    <Radio.Button value="suo">智能锁</Radio.Button>
                  </Radio.Group>
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item label="朝向" {...formItemShortLayouts}>
                <Select style={{ width: 120 }}>
                  <Option value="no">不限</Option>
                  <Option value="south">朝南</Option>
                  <Option value="north">朝北</Option>
                  <Option value="east">朝东</Option>
                  <Option value="wast">朝西</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </div>
          </div>
        </Form>
    )
  }

  renderTable(){
    const { dataSource } = this.props;
    console.log("datasorce",dataSource)
    return (<Table columns={columns} dataSource={dataSource} onChange={onChange} />);
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
              // size="large"
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
