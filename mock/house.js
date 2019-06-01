import { delay } from 'roadhog-api-doc';
import { mock } from 'mockjs';
import { wrapSuccessResponse } from './utils';

const getHouseList = (params) => {
  return mock({
    totalElements: 20,
    totalPages: 2,
    page: +params.page,
    houses: [],
    "houses|20":[
      {
        "key":"@id()",
        "platform|1": ['自如','蛋壳公寓','链家','嗨住租房','我爱我家'],
        "type|1":["整租","合租"],
        "price":'@integer(1000,3000)',
        "model|1":['一室一厅',"两室一厅",'三室一厅','二室两厅'],
        "size":'@integer(10,90)',
        "renovations|1": ['朝南','朝北','朝东','朝西'],
        "area|1":["滨江","江干"],
        "floor|1":['1楼','5楼','3楼','7楼'],
        "special|1":["独卫 阳台","精装修 独卫","近地铁 精装修"],
        "link":"http://lalal.com",
      }
    ]
  });
};

const getCommentList = (params) => {
  return mock({
    totalElements: 20,
    totalPages: 2,
    page: +params.page,
    comments: [
      {
        "id":"1",
        "user": '未知用户',
        "comment":'自如平台的房源非常好，装修简洁，居住舒适',
      },
      {
        "id":"2",
        "user": 'Alone',
        "comment":'我的天啊，这蛋壳的中介态度太差了吧！差评差评！挂这个中介！生气！',
      },
      {
        "id":"3",
        "user": '作业要写不完了',
        "comment":'去自如跟蛋壳都租过房子，感觉自如的房子偏贵',
      },
      {
        "id":"4",
        "user": '送你fafa',
        "comment":'租房子真难啊，找都找不下来',
      },
      {
        "id":"5",
        "user": '未知用户',
        "comment":'没有租房经验，来这里看看能不能找到好点的房源',
      },
      {
        "id":"6",
        "user": '未知用户',
        "comment":'刚毕业，租房好难找',
      },
      {
        "id":"7",
        "user": 'sasa',
        "comment":'蛋壳的中介费有点贵',
      },
      {
        "id":"8",
        "user": '一般般吧',
        "comment":'过来看看哪家的房子看起来靠谱点，这可是未来生活质量的保障啊',
      }
    ],
    // "comments|20":[
    //   {
    //     "id":"@id()",
    //     "user|1": ['未知用户','Alone','作业要写不完了','送你fafa'],
    //     "comment":'@ctitle(10,50)',
    //   }
    // ]
  });
};

const proxy = {
  'GET /houseList': wrapSuccessResponse(getHouseList),
  'GET /commentList':  wrapSuccessResponse(getCommentList),
  'POST /house/login':  wrapSuccessResponse(),
  'POST /house/register':  wrapSuccessResponse(),
  'POST /house/search':  wrapSuccessResponse(getHouseList),
  'GET  /house/collection':  wrapSuccessResponse(getHouseList),
  'POST /house/export': wrapSuccessResponse(),
  'POST /house/analysis': wrapSuccessResponse(),
};

export default delay(proxy, 500);
