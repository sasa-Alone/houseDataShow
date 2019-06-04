import routes from './router.config';
import { version, name } from '../package.json';

const getPublishPath = env => {
  console.log(`${name}:${version}`);
  console.log(`env:${env.BUILD_ENV}`);

  switch (env.BUILD_ENV) {
    case 'test':
      return `//cdn.xiaoyuanhao.com/test/${name}/${version}/`;
    case 'production':
      return `//s.xiaoyuanhao.com/${name}/${version}/`;
    default:
      return '/';
  }
};

// ref: https://umijs.org/config/
export default {
  targets: {
    ios: 9,
    safari: 9,
    ie: 9,
  },
  routes,
  publicPath: getPublishPath(process.env),
  treeShaking: true,
  // context: {
  //   user_agent_type: 'weixin',
  // },
  proxy: {
    "/house": {
      "target": "http://localhost:3004/",
      "changeOrigin": true,
      "pathRewrite": { "^/house" : "/house" }
    }
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          webpackChunkName: true,
        },
        title: 'mobile-activity',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,

            /components\//,
          ],
        },
      },
    ],
  ],
};
