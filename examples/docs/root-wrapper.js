const React = require("react");
const { Global, css } = require("@emotion/core");
const { ThemeProvider } = require("emotion-theming");
import mdxComponents from "./src/components/mdxComponents";
const { MDXProvider } = require("@mdx-js/tag");
console.log(mdxComponents);
export const universalWrapRootElement = ({ element }) => (
  <ThemeProvider theme={{}}>
    <MDXProvider components={mdxComponents}>
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html,
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
              "Roboto Light", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
              "Droid Sans", "Helvetica Neue", sans-serif, "Apple Color Emoji",
              "Segoe UI Emoji", "Segoe UI Symbol";

            font-size: 16px;
          }
        `}
      />
      {element}
    </MDXProvider>
  </ThemeProvider>
);
