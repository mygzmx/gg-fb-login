/**
 * 配置代理 npm install http-proxy-middleware --save
 * Note: You do not need to import this file anywhere. It is automatically registered when you start the development server.
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // 代理信息
  const proxyInfos = {
    '/drama-box': {
      // target: "https://info.dramaboxdb.com",
      target: 'https://hotdrama.hw.dzods.cn',
      // target: 'http://192.168.8.238:8082',
      // target: 'https://drama.hw.dzods.cn',
      changeOrigin: true
    },
    '/asg/portal': {
      // target: "https://api.klynf.com",
      // target: 'https://yfb.klynf.com',
      target: 'https://241.qcread.cn',
      changeOrigin: true
    },
    '/webfic/ur001': {
      // target: "https://api.klynf.com",
      // target: 'https://yfb.klynf.com',
      // target: 'http://192.168.8.238:8082',
      target: 'https://hotapi.hw.dzods.cn',
      changeOrigin: true
    }
  };
  Object.entries(proxyInfos).forEach(([key, proxyInfo]) => {
    app.use(createProxyMiddleware(key, proxyInfo));
  });
};
