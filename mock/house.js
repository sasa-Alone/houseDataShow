import { delay } from 'roadhog-api-doc';
import { mock } from 'mockjs';
import { wrapSuccessResponse } from './utils';

const getHouseList = (params) => {
  return mock({
    totalElements: 10,
    totalPages: 2,
    page: +params.page,
    content: [],
    "houses|20":[
      {
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

const proxy = {
  'GET /houseList': wrapSuccessResponse(getHouseList),
};

export default delay(proxy, 500);
