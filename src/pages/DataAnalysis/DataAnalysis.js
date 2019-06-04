import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Tabs, Row, Col, Divider } from 'antd';
import mapOption from './mapOption';
import barOption from './barOption';
import barOption2 from './barOption2';
import BMap from 'echarts/extension/bmap/bmap';
import { TagCloud } from 'ant-design-pro/lib/Charts';
import { connect } from 'dva';

const TabPane = Tabs.TabPane;

@connect(({ data })=> {
  return ({
    pipeData: data.pipeData,
    avePrice:data.avePrice,
    houseNumber:data.houseNumber,
    tagsResult:data.tagsResult,
    mapData:data.mapData,
  })
})
class DataAnalysis extends Component {


  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:'data/getData'
    });
  }

  getPieOption() {
    const data = this.genData();
    return {
      title: {
        text: '各大平台业务市场占比',
        subtext: '',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: data.legendData,

        selected: data.selected,
      },
      series: [
        {
          name: '市场占比',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data.seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  getBarOption() {
    const { avePrice } = this.props;
    return barOption(avePrice);
  }

  getBarOption2() {
    const { houseNumber }= this.props;
    return barOption2(houseNumber);
  }

  getMapOption() {
    const {mapData} = this.props;
    return mapOption(mapData);
  }

  changeTab(key) {
    console.log(key);
  }


  genData() {
    const { pipeData } = this.props;
    let legendData = [];
    for (let item in pipeData){
      legendData.push(item)
    }
    let seriesData = [];
    let selected = {};
    for (let i = 0; i < legendData.length; i++) {
      const name = legendData[i];
      seriesData.push({
        name,
        value: pipeData[name],
      });
      selected[legendData[i]] = i < legendData.length;
    }

    return {
      legendData: legendData,
      seriesData: seriesData,
      selected: selected,
    };
  }

  render() {
    const { tagsResult } = this.props;
    console.log(tagsResult)
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={(key) => {
          this.changeTab(key);
        }}>
          <TabPane tab="业务范围分析" key="1">
            <ReactEcharts style={{ height: '500px' }} option={this.getMapOption()}/>
          </TabPane>
          <TabPane tab="市场占比分析" key="2">
            <ReactEcharts option={this.getPieOption()}/>
          </TabPane>
          <TabPane tab="平均房源价格" key="3">
            <ReactEcharts option={this.getBarOption()}/>
          </TabPane>
          <TabPane tab="各价格房源数量" key="4">
            <ReactEcharts option={this.getBarOption2()}/>
          </TabPane>
          <TabPane tab="词云分析" key="5">
           <Row>
              <Col span={8}>
                <div>自如</div>
                <TagCloud key={tagsResult} data={tagsResult['自如']} height={200}/>
              </Col>
              <Col span={8}>
                <div>蛋壳</div>
                <TagCloud key={tagsResult} data={tagsResult['蛋壳公寓']} height={200}/>
              </Col>
              <Col span={8}>
                <div>嗨住</div>
                <TagCloud key={tagsResult} data={tagsResult['嗨住']} height={200}/>
              </Col>
            </Row>

          </TabPane>
        </Tabs>

      </div>
    );
  }
}

export default DataAnalysis;
