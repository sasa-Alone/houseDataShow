import React, { Component } from 'react';
import { Input, Button, Radio, Select, Table, Divider, Tag } from 'antd';
import styles from "./User.less";
import { connect } from 'dva';

@connect(({ user, loading })=> {
  return ({
    selectedRowKeys: user.selectedRowKeys,
    dataSource: user.collections,
    loading: loading.effects['user/getCollectionList'],
  })
})
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
      render: (text, record) => (
        <span>
          <a href= {record.link}>详情</a>
          <Divider type="vertical" />
          <a href="#"
          onClick={(e)=>{
            const {dispatch} = this.props;
            console.log("unCollection",record)
            dispatch({
              type:"user/unCollection",
              payload:{
                house:record,
              }
            })
          }}>取消收藏</a>
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
      type:"user/getCollectionList",
    });
  }

  handleFetch = () => {
    const { dispatch } = this.props;
    dispatch({
      type:"user/getCollectionList",
    });
  };

  handleSelectChange = selectedRowKeys => {
    const { dispatch } = this.props;
    dispatch({
      type:"user/save",
      payload: {
        selectedRowKeys,
      }
    });
  };

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
          <Button type="primary" style={{marginLeft: 16}}>
            批量导出
          </Button>
          <Button type="primary" style={{marginLeft: 16}}>
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
        {this.renderTable()}
      </div>
    );
  }
}

export default SearchHouse;
