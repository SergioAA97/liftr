const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@body-background": "#1D1554",
              "@component-background": "#4A34D4",
              "@text-color": "#4A34D4",
              "@heading-color": "#4A34D4",
              "@text-color-secondary": "#342594",
              "@background-color-light": "#323488",
              "@background-color-base": "#323488",
              "@error-color": "#E74C3C",
              "@warning-color": "#F1C40F",
              "@success-color": "#2ECC71",
              "@input-color": "#fff",
              "@primary-color": "#4A34D4",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
