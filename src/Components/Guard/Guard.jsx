import React from "react";

export default function Guard({ children }) {
  if (localStorage.getItem("tkn") == null) {
    return <h4> bara </h4>;
  }
  return <>{children}</>;
}
