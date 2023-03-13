// const { defineConfig } = require('@vue/cli-service');

module.exports = {
  lintOnSave: false,
  // transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:1016',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
};
