const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
module.exports = {
  configureWebpack: {
    plugins: [
      require("unplugin-auto-import/webpack")({
        resolvers: [ElementPlusResolver({importStyle: false})],
      }),
      require("unplugin-vue-components/webpack")({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
};
