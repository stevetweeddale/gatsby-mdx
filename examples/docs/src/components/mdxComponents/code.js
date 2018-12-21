import React from "react";

const Code = props => (
  <code
    {...props}
    css={{
      background: "#f9f7fb",
      border: "1px solid #ede7f3",
      borderRadius: "4px",
      padding: "2px 6px",
      fontSize: "0.9375em"
    }}
  />
);

Code.displayName = "Code";

export default Code;
