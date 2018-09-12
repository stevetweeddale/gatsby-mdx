const path = require("path");
const escapeStringRegexp = require("escape-string-regexp");
const defaultOptions = require("../utils/default-options");

module.exports = (props, pluginOptions) => {
  const { stage, loaders, actions, plugins, getNodes, store } = props;
  const options = defaultOptions(pluginOptions);
  const testMDXPattern = new RegExp(
    options.extensions.map(ext => `${escapeStringRegexp(ext)}$`).join("|")
  );
  const resolvableExtensions = new RegExp(
    store
      .getState()
      .program.extensions.map(ext => `${escapeStringRegexp(ext)}$`)
      .join("|")
  );

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, ".cache/gatsby-mdx"),
          use: [loaders.js()]
        },
        {
          test: resolvableExtensions,
          use: [
            {
              loader: "gatsby-mdx/loaders/static-graphql-mdx-loader",
              options: {
                getNodes,
                pluginOptions: options
              }
            }
          ]
        },
        {
          test: resolvableExtensions,
          use: [
            {
              loader: "gatsby-mdx/loaders/page-graphql-mdx-loader",
              options: {
                getNodes,
                pluginOptions: options
              }
            }
          ]
        },
        {
          test: testMDXPattern,
          use: [
            loaders.js(),
            {
              loader: "gatsby-mdx/loaders/mdx-loader",
              options: {
                ...props,
                pluginOptions: options
              }
            }
          ]
        }
      ]
    },
    plugins: [
      plugins.define({
        __DEVELOPMENT__: stage === `develop` || stage === `develop-html`
      })
    ]
  });
};