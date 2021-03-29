module.exports = {
  devServer: {
    proxy: {
      "/api/v1": {
        target: "https://testnet.bitmex.com",
        pathRewrite: { "^/api/v1": "" },
        changeOrigin: true,
        secure: false
      },
      "/wss": {
        target: "wss://testnet.bitmex.com/realtime",
        pathRewrite: { "^/wss": "" },
        changeOrigin: true,
        secure: false
      }
    }
  }
  // dev: {
  //   proxyTable: {
  //     // proxy all requests starting with /api to jsonplaceholder
  //     "/api/v1": {
  //       target: "",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/api": ""
  //       }
  //     }
  //   }
  // }
  // devServer: {
  //   proxy: ""
  // }
};
