module.exports = {
  chainWebpack: (config) => {

    // config.resolve.alias.set("vue", "@vue/compat");

    config.module
      .rule("vue")
      .use("vue-loader");
/*
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 3,
            },
          },
        };
      });*/
  },
  devServer: {
    // disableHostCheck: true,
    allowedHosts: ["localhost"],
    proxy: {
      "/api/*": {
        target: "http://webserver:5000/api/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/socket.io*": {
        target: "http://webserver:5000/socket.io",
        changeOrigin: true,
        pathRewrite: {
          "^/socket.io": "",
        },
      },
    },
  },
  lintOnSave: undefined,
  runtimeCompiler: true,
};
