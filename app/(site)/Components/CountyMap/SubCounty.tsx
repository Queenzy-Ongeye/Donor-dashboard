import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type INavigate = {
  imageNumber: any;
  subCountyName: string;
};

const SubCounty = ({ imageNumber, subCountyName }: INavigate) => {
  const router = useRouter();

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleHover = () => {
    setHovered(!hovered);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setClicked(!clicked);
    const pageName = (e.target as HTMLImageElement).alt; // get the alt text from the image
    router.push(`/SubCounties/${pageName}`);
  };

  const getImageSource = () => {
    // check if the subCountyName is "#"
    const initialImage =
      subCountyName === "#"
        ? // if yes, return the default image path
          `/assets/sub-counties/${imageNumber}_default.png`
        : // if no, return the active image path
          `/assets/sub-counties/${imageNumber}_active.png`;
    // check if the image is hovered
    return hovered
      ? // if yes, return the hover image path
        `/assets/sub-counties/${imageNumber}_hover.png`
      : // if no, return the initial image path
        initialImage;
  };

  return (
    <>
      <Image
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onClick={(e) => handleClick(e)}
        className="block cursor-pointer"
        src={getImageSource()}
        alt={`${subCountyName}`}
        layout="fill"
        priority={true}
      />
    </>
  );
};

export default SubCounty;
