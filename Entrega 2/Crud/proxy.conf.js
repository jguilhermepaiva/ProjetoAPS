const PROXY_CONFIG = [
  {
    context: ['/apiCompras'],
    target: 'http://localhost:8080',
    secure: false,
    logLevel: 'debug'
  },
  {
    context: ['/apiProdutos'],
    target: 'http://localhost:8081',
    secure: false,
    logLevel: 'debug'
  },
  {
    "/qrCode": {
      "target": "https://sandbox.api.pagseguro.com",
      "secure": false,
      "changeOrigin": true,
      "pathRewrite": {
        "^/qrCode": "/orders"
      }
    }
  }
];

module.exports = PROXY_CONFIG;
