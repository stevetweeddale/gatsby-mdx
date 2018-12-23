import React from "react";
import { Global, css, jsx } from "@emotion/core";
import Highlight, { defaultProps } from "prism-react-renderer";
import codeTheme from "prism-react-renderer/themes/duotoneLight";
import { withTheme } from "emotion-theming";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

const prismMap = {
  sh: "bash",
  shell: "bash"
};
export default withTheme(({ theme, is, children, lang = "markup", ...etc }) => {
  const props = {
    ...etc,
    className: etc.className ? etc.className : `language-${lang}`
  };

  // if no `is` default to inline code
  if (!is) {
    return (
      <Highlight
        {...defaultProps}
        theme={theme.code || codeTheme}
        code={children.trim()}
        language={lang}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <code className={className} style={{ ...style, display: "inline" }}>
            {tokens.map((line, i) =>
              line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))
            )}
          </code>
        )}
      </Highlight>
    );
  }

  // live component rendering
  if (is === "react-live") {
    return (
      <LiveProvider code={exampleCode}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  }

  // otherwise, use prism to render a code block
  return (
    <Highlight
      {...defaultProps}
      theme={theme.code || codeTheme}
      code={children.trim()}
      language={prismMap[lang] || lang}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={style}
          css={{ overflow: "auto", padding: "1rem", marginTop: "1.5rem" }}
        >
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
});
