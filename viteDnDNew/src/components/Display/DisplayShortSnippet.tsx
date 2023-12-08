import React, { ReactNode } from "react";

const ShortSnippet: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="col-md-6">{children}</div>;
};

export default ShortSnippet;
