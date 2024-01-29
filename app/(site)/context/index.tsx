import React from "react";
import { FilterProvider } from "./FilterContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <FilterProvider>{children}</FilterProvider>
    </div>
  );
};

export default Provider;
