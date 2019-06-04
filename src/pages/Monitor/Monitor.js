import React, { Component } from 'react';
import styles from './Monitor.less';
import { Row, Col, Timeline, Steps, Button, Icon, Divider } from 'antd';
import { connect } from 'dva';

const Step = Steps.Step;

const list = [];
for (let i = 0; i < 5; i++) {
  const item = {
    id: i,
    status: i % 2 === 0,
    statusName: i % 2 === 0 ? '成功' : '失败',
    name: `第${i}次爬取数据`,
  };
  list.push(item);
}

@connect(({ monitor })=> {
  return ({
    active: monitor.active,
    result: monitor.result,
    recordList: monitor.recordList,
  })
})
class Monitor extends Component {

  // constructor(props) {
  //   super(props);
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:'monitor/getRecord'
    })
  }

  handleClickStart() {
    const { dispatch } = this.props;
    dispatch({
      type:'monitor/save',
      payload:{
        active: 1,
      }
    })
    dispatch({
      type:'monitor/stratCrawl',
    })
  }

  getRecordList(){

  }

  renderHistoryRecord() {
    const { recordList } = this.props;
    const historyEle = [];
    recordList.forEach((item, index) => {
      historyEle.push(
        <Timeline.Item key={index} color={index%2===0 ? 'green' : 'red'}>
          {/* <div> */}
            <span>开始时间: {new Date(item.start_time).toString()} &nbsp;</span>
            <Divider type="vertical" />
            <span>结束时间: {new Date(item.finish_time).toString()} &nbsp;</span>
          {/* </div> */}
          {/* <div> */}
            <Divider type="vertical" />
            <span>爬取平台: {item.platform} &nbsp;</span>
            <Divider type="vertical" />
            <span>数据量: {item.item_scraped_count} &nbsp;</span>
          {/* </div> */}
        </Timeline.Item>,
      );
    });
    return (
      <Timeline>
        {historyEle}
      </Timeline>
    );
  }

  renderStep() {
    const {active, result} = this.props;
    return (
      <Steps current={active} status={result?'finish':'error'}>
        <Step title='未开始'/>
        <Step title='爬取中' icon={active===1?<Icon type='loading'/>:''}/>
        <Step title={result?'爬取成功':'爬取失败'}/>
      </Steps>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {/* <Row> */}
          {/* <Col span={14}> */}
            <h3>爬虫执行</h3>
            {this.renderStep()}
            <div className='btn-line'>
              <Button className='right' onClick={()=>this.handleClickStart()} type="primary">开始</Button>
              {/* <Button style={{ marginLeft: '20px' }}>取消</Button> */}
            </div>
          {/* </Col> */}
          {/* <Col offset={2} span={8}> */}
            <h3 className='area'>爬取记录</h3>
            {this.renderHistoryRecord(list)}
          {/* </Col> */}
        {/* </Row> */}
      </div>
    );
  }
}

export default Monitor;
