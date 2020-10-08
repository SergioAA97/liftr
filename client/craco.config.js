const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@body-background": "#0b1246",
              "@component-background": "#1D1F77",
              "@text-color": "rgba(255, 255, 255, 0.65)",
              "@heading-color": "rgba(255, 255, 255, 0.85)",
              "@text-color-secondary": "rgba(255, 255, 255, 0.45)",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
