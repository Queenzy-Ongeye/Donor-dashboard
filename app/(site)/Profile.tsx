"use clients";
import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import React, { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs";
import Image from "next/image";
import profileImg from "@/public/assets/profile_1.png";
import ToggleButton from "./Components/ToggleButton";
const Profile = () => {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  const { data: session } = useSession();
  let user: any = session?.user;
  return (
    <Menu as="div" className="relative inline-block text-left z-50">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center  px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500 ">
          <span className="h-4 w-4 sm:h-10 sm:w-10 md:h-8 md:w-8 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
            <Image
              priority
              src={profileImg}
              alt="user profile photo"
              width={50}
              height={50}
            />
          </span>
          <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
            <span className="text-sm sm:text-sm md:text-md lg:text-lg">
              {user?.Name}
            </span>
          </div>

          <BsChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="">
            <Menu.Item>{({}) => <ToggleButton />}</Menu.Item>
            <hr className={`relative h-px mt-2 bg-gray-800`} />
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut({ callbackUrl: "/auth/signIn" });
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex justify-start px-4 py-2 text-sm w-full hover:text-white hover:bg-red-500 hover:rounded-b-lg"
                  )}
                >
                  Log Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Profile;
