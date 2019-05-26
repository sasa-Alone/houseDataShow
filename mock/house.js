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
    comments: [],
    "comments|20":[
      {
        "id":"@id()",
        "user|1": ['未知用户','Alone','作业要写不完了','送你fafa'],
        "comment":'@paragraph(1,5)',
      }
    ]
  });
};

const proxy = {
  'GET /houseList': wrapSuccessResponse(getHouseList),
  'GET /commentList':  wrapSuccessResponse(getCommentList),
};

export default delay(proxy, 500);
