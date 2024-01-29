"use client";

import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import SubCounty from "./SubCounty";
import { MapAttribute, ToolTipAttribute } from "./Attributes";
import ColorCode from "./ColorCode";

interface IMapAttribute {
  id: number;
  name: string;
  outerStyle: string;
  innerStyle: string;
  subCountyLink: string;
}
interface ITipAttribute {
  id: number;
  place: string;
  subCounty: string;
}

const NccCleanMap = () => {
  return (
    <>
      <div className="flex flex-col relative mx-[auto] my-[20px] min-h-[45vh] gap-4">
        <div className="min-h-[45vh] text-[0.40rem]">
          {MapAttribute.map((attribute: IMapAttribute) => (
            <div
              key={attribute.id}
              data-tooltip-id={`${attribute.id}`}
              className={attribute.outerStyle}
            >
              <div className={attribute.innerStyle}>
                <SubCounty
                  imageNumber={attribute.id}
                  subCountyName={attribute.subCountyLink}
                />
              </div>
            </div>
          ))}
        </div>
        <ColorCode />
      </div>

      <div className="z-50">
        {ToolTipAttribute.map((tipAttribute: ITipAttribute) => (
          <ReactTooltip
            key={tipAttribute.id}
            id={`${tipAttribute.id}`}
            place="left"
            content={tipAttribute.subCounty}
          />
        ))}
      </div>
    </>
  );
};

export default NccCleanMap;
