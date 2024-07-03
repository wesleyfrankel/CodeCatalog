"use client";
import React from "react";
import { AddFavorite, DeleteFavorite } from "../api/favorites";
import { FavoritePackageData, PackageData } from "../interfaces/packageData";
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import { IconContext } from "react-icons";

interface Props {
  packageData: PackageData;
  favorites: FavoritePackageData[];
  addFavorites: (item: FavoritePackageData) => void;
  deleteFavorites: (item: FavoritePackageData) => void;
}

const FavoriteStar = ({
  packageData,
  favorites,
  addFavorites,
  deleteFavorites,
}: Props) => {
  const isFavorite = !!favorites.find((fav) => {
    return fav.name === packageData.name;
  });

  const handleStarClick = async () => {
    try {
      if (!isFavorite) {
        const item = await AddFavorite(packageData);
        console.log(item);
        addFavorites(item);
      } else {
        // TODO GET ITEM BY ID
        const item = favorites.find((fav) => fav.name === packageData.name);
        if (item && item._id) {
          await DeleteFavorite(item._id);
          deleteFavorites(item);
        }
      }
    } catch (error) {
      console.log("Error!");
    }
  };

  return (
    <>
      <IconContext.Provider value={{ size: "2em" }}>
        <td
          className="center-content"
          onClick={handleStarClick}
          style={{ cursor: "pointer" }}
        >
          {isFavorite ? (
            <HiStar style={{ color: "yellow" }} />
          ) : (
            <HiStar style={{ color: "black" }} />
          )}
        </td>
      </IconContext.Provider>
    </>
  );
};

export default FavoriteStar;
