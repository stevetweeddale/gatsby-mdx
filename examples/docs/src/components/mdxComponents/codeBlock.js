import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import prismTheme from "prism-react-renderer/themes/nightOwl";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

/* eslint-disable react/jsx-key */
const CodeBlock = ({ children: exampleCode, ...props }) => {
  if (props["react-live"]) {
    return (
      <LiveProvider code={exampleCode}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  } else {
    return (
      <Highlight
        {...defaultProps}
        code={exampleCode}
        language="jsx"
        theme={prismTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style} p={3}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  }
};

export default CodeBlock;
