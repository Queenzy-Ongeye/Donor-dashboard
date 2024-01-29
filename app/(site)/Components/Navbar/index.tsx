"use client";
import Image from "next/image";
import React, { useState } from "react";
import fullLogo from "@/public/logo/f4e-logo.webp";
import logo from "@/public/logo/f4e-logo-short.webp";
import { MenuTag, menuTags } from "../../utils/data";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { useMedia } from "react-use";
import { useAppContext } from "@/app/context/AppContext";

type Props = {
  open: boolean;
  setOpen(open: boolean): void;
};

export const onBoardingNarbarSteps = [
  {
    element: "#side-bar",
    intro: "Navigate through different pages",
  },
];

const SideNavBar = ({ open, setOpen }: Props) => {
  const { view } = useAppContext();

  const [sideBarFull, setSideBarFull] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [loading, setLoading] = useState(false);
  const isDesktop = useMedia("(min-width: 768px)", true);

  const toggleSidebar = () => setOpen(!open);

  const handleMenuItemClick = (menuName: any) => {
    setActiveMenu(menuName);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  };

  const modifiedMenuTags = menuTags.map((menu) => {
    if (menu.name === "Meals") {
      // Dynamically change the "Meals" route based on the selected view
      menu.route = view === "fim" ? "/meals-served" : "/meals-produced";
    }
    return menu;
  });

  return (
    <>
      {isDesktop ? (
        <aside
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`${
            !sideBarFull ? "w-64" : "w-20"
          } sticky left-0 top-0 h-full xl:left-0 sm:bg-white md:bg-white xl:bg-white xl:bg-transparent max-h-full duration-500 flex 
       first-letter shadow-lg hover:border-r hover:border-orange-400`}
        >
          <div
            className={`${
              !sideBarFull ? "w-64" : "w-20"
            } flex flex-col h-screen mx-auto px-4 justify-center`}
          >
            <div
              className={`${
                !sideBarFull ? "h-20 w-40" : "h-16 w-[100%]"
              } relative cursor-pointer`}
            >
              <Image
                src={!sideBarFull ? fullLogo : logo}
                alt="logo"
                fill
                className=""
              />
            </div>
            <hr
              className={`${
                !sideBarFull ? "w-58" : "w-14"
              } relative h-px mt-2 bg-gray-800`}
            />
            <div className="mt-4 flex flex-col gap-4 relative">
              {modifiedMenuTags
                ?.filter((menu) => menu.accessLevel.includes(view))
                .map((menu: MenuTag, index: number) => (
                  <Link
                    href={menu.route}
                    key={index}
                    id="side-bar"
                    onClick={() => handleMenuItemClick(menu.name)}
                    className={`${
                      menu?.margin && "mt-3"
                    } group text-gray-800 flex items-center text-sm gap-3.5 rounded-sm  font-medium p-2  ${
                      !sideBarFull
                        ? "shadow-md shadow-gray-300 hover:border-l-4 hover:border-orange-500 md:shadow-md md:shadow-gray-300 md:hover:border-l-4 md:hover:border-orange-500"
                        : "shadow-md shadow-gray-300 w-12 hover:border-l-4 hover:border-orange-500 md:shadow-gray-300 md:w-12 md:hover:border-l-4 md:hover:border-orange-500"
                    } ${
                      activeMenu === menu.name
                        ? "border-l-4 border-orange-500 md:border-l-4 md:border-orange-500 sm:border-l-4 sm:border-orange-500"
                        : ""
                    }`}
                  >
                    <div className="bg-gradient-to-tl from-gray-200 to-gray-100 sm:bg-gradient-to-tl sm:from-gray-200 sm:to-gray-100 md:bg-gradient-to-tl md:from-gray-200 md:to-gray-100 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                      {React.createElement(menu.icon, { size: "26" })}
                    </div>
                    <h2
                      style={{
                        transitionDelay: `${index + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${
                        sideBarFull &&
                        "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      {menu.name}
                    </h2>
                    <h2
                      className={`${
                        !sideBarFull && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre
                text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2
                group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit hover:z-20`}
                    >
                      {menu.name}
                    </h2>
                  </Link>
                ))}
            </div>
          </div>

          <div
            className={`absolute flex items-center text-2xl duration-300 rounded-xl -right-3.5 top-8 ${
              isHovered && "border cursor-pointer bg-white border-orange-400"
            }`}
            onClick={() => setSideBarFull(!sideBarFull)}
          >
            <BsArrowRightShort
              className={` cursor-pointer duration-300 ${
                isHovered ? "text-orange-400 z-20" : "hidden"
              } ${sideBarFull && "rotate-180 -right-2.5"}`}
            />
          </div>
        </aside>
      ) : (
        <div className="">
          <div
            className={
              open
                ? "absolute top-0 left-0 z-50 h-[650px] w-1/2 shadow-md bg-white"
                : "hidden"
            }
          >
            <div className="flex flex-col text-center">
              <button
                className="mb-7 mt-7 mr-1 flex justify-end px-5 text-xl"
                onClick={() => toggleSidebar()}
              >
                <GrClose />
              </button>
              <aside
                className={`sticky left-0 top-0 h-full xl:left-0 sm:bg-white md:bg-white xl:bg-white xl:bg-transparent max-h-full duration-500 flex 
       first-letter shadow-lg hover:border-r hover:border-orange-400 `}
              >
                <div
                  className={`flex flex-col h-screen mx-auto px-2 justify-center`}
                >
                  <div className={`relative cursor-pointer h-20 w-40`}>
                    <Image src={fullLogo} alt="logo" fill className="" />
                  </div>
                  <hr className={`relative h-px mt-2 bg-gray-800`} />
                  <div className="mt-4 flex flex-col gap-4 relative">
                    {menuTags?.map((menu: any, index: number) => (
                      <Link
                        href={menu.route}
                        key={index}
                        onClick={() => handleMenuItemClick(menu.name)}
                        className={`${
                          menu?.margin && "mt-3"
                        } group text-gray-800 flex items-center text-sm gap-3.5 rounded-sm  font-medium p-2 shadow-md shadow-gray-300 hover:border-l-4 
                        hover:border-orange-500 md:shadow-md md:shadow-gray-300 md:hover:border-l-4 md:hover:border-orange-500 ${
                          activeMenu === menu.name
                            ? "border-l-4 border-orange-500 md:border-l-4 md:border-orange-500 sm:border-l-4 sm:border-orange-500"
                            : ""
                        }`}
                      >
                        <div className="bg-gradient-to-tl from-gray-200 to-gray-100 sm:bg-gradient-to-tl sm:from-gray-200 sm:to-gray-100 md:bg-gradient-to-tl md:from-gray-200 md:to-gray-100 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                          {React.createElement(menu.icon, { size: "26" })}
                        </div>
                        <h2
                          style={{
                            transitionDelay: `${index + 3}00ms`,
                          }}
                          className={`whitespace-pre duration-500 ${
                            sideBarFull &&
                            "opacity-0 translate-x-28 overflow-hidden"
                          }`}
                        >
                          {menu.name}
                        </h2>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SideNavBar;
