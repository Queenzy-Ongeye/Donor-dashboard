import { useAppContext } from "@/app/context/AppContext";
import React from "react";

const ToggleButton = () => {
  const { view, setView } = useAppContext();

  const toggleState = () => {
    setView((prevState) => (prevState === "ncc" ? "fim" : "ncc"));
  };

  return (
    <div className="flex w-auto justify-start ml-2 gap-4 mt-2">
      <div className="relative w-full hidden md:flex gap-6">
        <label
          id="toggle-switch"
          className="relative flex w-full cursor-pointer select-none items-center text-black"
        >
          <>
            <input
              type="checkbox"
              name="autoSaver"
              className="sr-only"
              onClick={toggleState}
            />
            <div
              className={`slider mr-[1.5] flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 border  ${
                view === "fim" ? "bg-orange-300" : "bg-green-300"
              }`}
            >
              <span
                className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                  view === "fim" ? "translate-x-6" : ""
                }`}
              ></span>
            </div>
          </>
          <div className="label text-sm font-small ml-2">
            <p className={`${view === "fim" ? "text-black" : "text-gray-400"}`}>
              {view === "fim" ? "FIM" : "NCC"} View
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ToggleButton;
