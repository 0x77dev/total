module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  pwa: {
    name: "Total",
    themeColor: "#272727",
    msTileColor: "#272727",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      display: "portrait",
    },
  },
};
