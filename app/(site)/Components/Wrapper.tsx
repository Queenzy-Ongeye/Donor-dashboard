import React, { useState } from "react";
import SecurePages from "../SecurePages";
import { FilterProvider } from "../context/FilterContext";
import SideNavBar from "./Navbar";
import Breadcrumb from "./breadCrumb";

export type TChildren = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: TChildren) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <SecurePages>
      <FilterProvider>
        <SideNavBar open={showSidebar} setOpen={setShowSidebar} />
        <div className={`flex-col flex-1`}>
          <Breadcrumb
            homeElement={<h1 className="text-lg text-gray-600">Dashboard</h1>}
            separator={<span>/</span>}
            activeClasses="text-f4e-orange text-lg"
            containerClasses="flex mx-2 my-2"
            listClasses="hover:underline font-bold flex space-x-2"
            capitalizeLinks
            onMenuButtonClick={() => setShowSidebar((prev) => !prev)}
          />
          <main>{children}</main>
        </div>
      </FilterProvider>
    </SecurePages>
  );
};

export default PageWrapper;
