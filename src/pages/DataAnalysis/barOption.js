const app = {
  title: '坐标轴刻度与标签对齐',
};


const option = {
  color: ['#3398DB'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['蛋壳公寓','自如','链家','我爱我家','嗨住租房'],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '直接访问',
      type: 'bar',
      barWidth: '60%',
      data: [2110, 2314, 1997, 2103, 2403],
    },
  ],
};

export default option;
