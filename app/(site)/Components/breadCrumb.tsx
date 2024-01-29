"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ReactNode } from "react";
import Profile from "../Profile";
import { Bars3Icon } from "@heroicons/react/24/outline";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  onMenuButtonClick(): void;
};

function Breadcrumb({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
  onMenuButtonClick,
}: TBreadCrumbProps) {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  return (
    <div className="border-b border-f4e-orange text-zinc-500 flex items-center z-10 shadow-sm h-10 bg-white w-full">
      <button className="md:hidden" onClick={onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>
      <div className="flex-1">
        <ul className={containerClasses}>
          <li className={listClasses}>
            <Link href={"/"}>{homeElement}</Link>
            {pathNames.length > 0 && separator}
            {pathNames.map((link, index) => {
              let href = `/${pathNames.slice(0, index + 1).join("/")}`;
              let itemClasses =
                paths === href
                  ? `${listClasses} ${activeClasses}`
                  : listClasses;
              let itemsLink = (
                capitalizeLinks
                  ? link[0].toUpperCase() + link.slice(1, link.length)
                  : link
              ).replace("%20", " ");
              
              return (
                <ul key={index} className="flex">
                  <li className={itemClasses}>
                    <Link href={href}>{(itemsLink.length > 30 ? "" : itemsLink)}</Link>
                  </li>
                  {pathNames.length !== index + 1 && separator}
                </ul>
              );
            })}
          </li>
        </ul>
      </div>
      <div className="flex-end">
        <Profile />
      </div>
    </div>
  );
}

export default Breadcrumb;
