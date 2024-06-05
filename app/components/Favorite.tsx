"use client";
import React, { useState } from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import { IconContext } from "react-icons";

const Favorite = () => {
  const [favorite, setFavorite] = useState<boolean>(false);

  const handleStarClick = () => {
    setFavorite(!favorite);
  };

  return (
    <IconContext.Provider value={{ size: "1.5em" }}>
      <td onClick={handleStarClick} style={{ cursor: "pointer" }}>
        {favorite ? <HiStar style={{ color: "yellow" }} /> : <HiOutlineStar />}
      </td>
    </IconContext.Provider>
  );
};

export default Favorite;
