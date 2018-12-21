import React from "react";
import Heading from "../heading";
import Code from "./code";
import CodeBlock from "./codeBlock";

/* eslint-disable react/display-name */
export default {
  h1: props => <Heading {...props} is="h1" fontSize={[5, 6]} />,
  h2: props => <Heading {...props} is="h2" fontSize={[4, 5]} />,
  h3: props => <Heading {...props} is="h3" fontSize={3} />,
  h4: props => <Heading {...props} is="h4" fontSize={2} />,
  h5: props => <Heading {...props} is="h5" fontSize={1} />,
  h6: props => <Heading {...props} is="h6" fontSize={0} />,
  code: CodeBlock,
  inlineCode: Code
  // TODO add `a`
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  // TODO add `table`
};
