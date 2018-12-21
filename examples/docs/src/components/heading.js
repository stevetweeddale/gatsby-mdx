import { css } from "@emotion/core";

const Heading = ({ as: Component, ...props }) => (
  <Component {...props} css={{}} />
);

export default Heading;
