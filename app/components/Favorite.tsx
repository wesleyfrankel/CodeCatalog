"use client";
import React, { useState } from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import { IconContext } from "react-icons";
import Search from "./Search";

const Favorite = () => {
  const [favorite, setFavorite] = useState<boolean>(false);

  const handleStarClick = () => {
    setFavorite(!favorite);
  };

  return (
    <>
      <IconContext.Provider value={{ size: "2em" }}>
        <td
          className="center-content"
          onClick={handleStarClick}
          style={{ cursor: "pointer" }}
        >
          {favorite ? (
            <HiStar style={{ color: "yellow" }} />
          ) : (
            <HiOutlineStar />
          )}
        </td>
      </IconContext.Provider>
    </>
  );
};

export default Favorite;
