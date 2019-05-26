export default [
  {
    path: `/`,
    component: '../layouts/BasicLayout',
    routes: [
      // 房源搜索
      { path: '/', redirect: '/searchHouse'},
      {
        path: '/searchHouse',
        component:'./SearchHouse/SearchHouse'
      },
      //数据分析
      {
        path: '/dataAnalysis',
        component:'./DataAnalysis/DataAnalysis'
      },
      //爬虫监控
      {
        path: '/monitor',
        component:'./Monitor/Monitor'
      },
      //个人中心
      {
        path: '/comment',
        component:'./Comment/Comment'
      },
      //个人中心
      {
        path: '/user',
        component:'./User/User'
      },
    ]
  },
];
