import React, { Component } from 'react';
import styles from './Monitor.less';
import { Row, Col, Timeline, Steps, Button, Icon } from 'antd';

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

class Monitor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      result: true,
      recordList: []
    };
  }

  handleClickStart() {
    this.setState({
      active: 1,
    });
    setTimeout(()=>{
      console.log()
      const random = Math.random()*100
      if (random > 50) {
        this.setState({
          active: 2,
          result: false
        })
      }else{
        this.setState({
          active: 2,
          result: true
        })
      }
    },1000)
  }

  getRecordList(){

  }

  renderHistoryRecord(list) {
    const historyEle = [];
    list.forEach((item, index) => {
      historyEle.push(
        <Timeline.Item key={index} color={item.status ? 'green' : 'red'}>
          <div>{item.name}</div>
          <div>{item.statusName}</div>
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
    const {active, result} = this.state
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
        <p>爬虫监控页面</p>
        <Row>
          <Col span={14}>
            <p>爬虫操作区域</p>
            {this.renderStep()}
            <div className='btn-line'>
              <Button onClick={()=>this.handleClickStart()} type="primary">开始</Button>
              <Button style={{ marginLeft: '20px' }}>取消</Button>
            </div>
          </Col>
          <Col offset={2} span={8}>
            <p>爬取记录区域</p>
            {this.renderHistoryRecord(list)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Monitor;
