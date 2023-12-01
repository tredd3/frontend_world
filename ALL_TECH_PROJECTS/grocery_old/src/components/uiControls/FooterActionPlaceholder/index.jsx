import React from "react";

 const FooterActionPlaceholder = ({children}) => (
  <div
    style={{
      position: "fixed",
      bottom: 0,
      width: "100%",
      marginBottom: 15,
      textAlign: "center",
      display: "flex"
    }}
  >
    <div style={{ flexGrow: "0.85", margin: "auto auto" }} >
        {children}
    </div>
  </div>
);

export default FooterActionPlaceholder
