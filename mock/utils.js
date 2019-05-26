import mockjs from 'mockjs';

export const wrapSuccessResponse = (data = null) => (req, res) => {
  const params = req.method === 'GET' ? req.query : req.body;
  const resolveData = typeof data === 'function' ? data(params) : data;
  Promise.resolve(resolveData).then(ret => {
    res.send({
      code: 200,
      msg: '操作成功',
      data: ret,
    });
  });
};

export const wrapErrorResponse = (data = null) => (req, res) => {
  const params = req.method === 'GET' ? req.query : req.body;

  res.send({
    code: 404,
    msg: '这是操作失败的内容',
    data: typeof data === 'function' ? data(params) : data,
  });
};

export const wrapRandomResponse = (data = null) => (req, res) => {
  const { code } = mockjs.mock({ 'code|1': [200, 404] });
  const msg = code === 200 ? '操作成功' : '这是操作失败的内容';
  const params = req.method === 'GET' ? req.query : req.body;
  const newData = code === 200 ? (typeof data === 'function' ? data(params) : data) : {};

  res.send({
    code,
    msg,
    data: newData,
  });
};
