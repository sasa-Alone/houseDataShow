import echarts from 'echarts'


var posList = [
  'left', 'right', 'top', 'bottom',
  'inside',
  'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
  'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];
const app = {}
app.configParameters = {
  rotate: {
    min: -90,
    max: 90
  },
  align: {
    options: {
      left: 'left',
      center: 'center',
      right: 'right'
    }
  },
  verticalAlign: {
    options: {
      top: 'top',
      middle: 'middle',
      bottom: 'bottom'
    }
  },
  position: {
    options: echarts.util.reduce(posList, function (map, pos) {
      map[pos] = pos;
      return map;
    }, {})
  },
  distance: {
    min: 0,
    max: 100
  }
};

app.config = {
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
  onChange: function () {
    var labelOption = {
      normal: {
        rotate: app.config.rotate,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        position: app.config.position,
        distance: app.config.distance
      }
    };
  }
};


var labelOption = {
  normal: {
    show: true,
    position: app.config.position,
    distance: app.config.distance,
    align: app.config.align,
    verticalAlign: app.config.verticalAlign,
    rotate: app.config.rotate,
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
      name: {
        textBorderColor: '#fff'
      }
    }
  }
};

const option = {
  color: ['#003366', '#006699', '#4cabce', '#e5323e'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['Forest', 'Steppe', 'Desert', 'Wetland']
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      mark: {show: true},
      dataView: {show: true, readOnly: false},
      magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      axisTick: {show: false},
      data: ['<1000', '1000-1500', '1500-2000', '2000-2500', '>2500']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '蛋壳公寓',
      type: 'bar',
      barGap: 0,
      label: labelOption,
      data: [320, 332, 301, 334, 390]
    },
    {
      name: '自如',
      type: 'bar',
      label: labelOption,
      data: [220, 182, 191, 234, 290]
    },
    {
      name: '链家',
      type: 'bar',
      label: labelOption,
      data: [150, 232, 201, 154, 190]
    },
    {
      name: '嗨住租房',
      type: 'bar',
      label: labelOption,
      data: [98, 77, 101, 99, 40]
    }
  ]
};

export default option;
