export default function(data){
  const app = {
    title: '坐标轴刻度与标签对齐',
  };

  const nameList = [];
  const priceList = [];
  for(let item in data){
    nameList.push(item);
    priceList.push(Math.round(data[item].averagePrice))
  }
  return {
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
        data: nameList,
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
        name: '平均价格',
        type: 'bar',
        barWidth: '60%',
        data: priceList,
      },
    ],
  };
};
