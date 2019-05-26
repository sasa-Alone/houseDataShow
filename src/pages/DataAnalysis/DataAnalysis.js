import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Tabs,Row, Col,Divider  } from 'antd';
import mapOption from './mapOption'
import barOption from './barOption'
import barOption2 from './barOption2'
import BMap from 'echarts/extension/bmap/bmap'
import { TagCloud } from 'ant-design-pro/lib/Charts';


const TabPane = Tabs.TabPane;


class DataAnalysis extends Component {

  constructor(props){
    super(props)
  }

  getPieOption() {
    const data = this.genData(50);
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
          name: '姓名',
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
    const option = barOption
    return option;
  }
  getBarOption2() {
    const option = barOption2
    return option;
  }
  getMapOption() {
    const option = mapOption
    return option;
  }

  changeTab(key) {
    console.log(key);
  }

  getTagCloud(){
    const tags = []
    const tagsName = [
      '首页',
      '公寓',
      '地铁',
      '近地',
      '精装',
      '精装',
      '精装',
      '精装',
      '阳台',
      '阳台',
      '阳台',
      '独卫',
      '独卫',
      '独卫',
      '绿化',
      '小区',
      '首页',
      '公寓',
      '地铁',
      '近地',
      '精装',
      '精装',
      '精装',
      '精装',
      '阳台',
      '阳台',
      '阳台',
      '独卫',
      '独卫',
      '独卫',
      '绿化',
      '小区',
      '首页',
      '公寓',
      '地铁',
      '近地',
      '精装',
      '精装',
      '精装',
      '精装',
      '阳台',
      '阳台',
      '阳台',
      '独卫',
      '独卫',
      '独卫',
      '绿化',
      '小区',
      '首页',
      '公寓',
      '地铁',
      '近地',
      '精装',
      '精装',
      '精装',
      '精装',
      '阳台',
      '阳台',
      '阳台',
      '独卫',
      '独卫',
      '独卫',
      '绿化',
      '小区',
    ];
    for (let i = 0; i < tagsName.length; i += 1) {
      tags.push({
        name: tagsName[i],
        value: Math.floor(Math.random() * 50) + 20,
      });
    }
    return tags;
  }

  genData() {
    let legendData = ['蛋壳公寓','自如','链家','我爱我家','嗨住租房'];
    let seriesData = [];
    let selected = {};
    for (let i = 0; i < legendData.length; i++) {
      seriesData.push({
        name: legendData[i],
        value: Math.round(Math.random() * 100000),
      });
      selected[legendData[i]] = i < 6;
    }

    return {
      legendData: legendData,
      seriesData: seriesData,
      selected: selected,
    };
  }

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={(key)=>{this.changeTab(key)}}>
          <TabPane tab="业务范围分析" key="1">
            <ReactEcharts style={{height:'500px'}} option={this.getMapOption()}/>
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
                <TagCloud data={this.getTagCloud()} height={200} />
              </Col>
              <Col span={8}>
                <div>蛋壳</div>
                <TagCloud data={this.getTagCloud()} height={200} />
              </Col>
              <Col span={8}>
                <div>链家</div>
                <TagCloud data={this.getTagCloud()} height={200} />
              </Col>
            </Row>
          </TabPane>
        </Tabs>

      </div>
    );
  }
}

export default DataAnalysis;
