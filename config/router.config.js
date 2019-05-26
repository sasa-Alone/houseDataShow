export default [
  {
    path: `/`,
    component: '../layouts/HomeLayout',
  },
  {
    path: `/index`,
    component: '../layouts/BasicLayout',
    routes: [
      // 房源搜索
      { path: '/index', redirect: '/index/searchHouse'},
      {
        path: '/index/searchHouse',
        component:'./SearchHouse/SearchHouse'
      },
      //数据分析
      {
        path: '/index/dataAnalysis',
        component:'./DataAnalysis/DataAnalysis'
      },
      //爬虫监控
      {
        path: '/index/monitor',
        component:'./Monitor/Monitor'
      },
      //个人中心
      {
        path: '/index/comment',
        component:'./Comment/Comment'
      },
      //个人中心
      {
        path: '/index/user',
        component:'./User/User'
      },
    ]
  },
];
