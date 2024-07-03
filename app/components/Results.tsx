import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import FavoriteStar from "./FavoriteStar";
import "../globals.css";
import { FavoritePackageData, PackageData } from "../interfaces/packageData";
import { GetFavorites } from "../api/favorites";

interface ResultsProp {
  packageDataList: PackageData[];
}

const Results: React.FC<ResultsProp> = ({ packageDataList }) => {
  const [favorites, setFavorites] = useState<FavoritePackageData[]>([]);
  console.log(favorites);
  useEffect(() => {
    const getFavorites = async () => {
      const currentFavorites = await GetFavorites();
      setFavorites(currentFavorites);
    };
    getFavorites();
  }, []);

  const addFavorite = (packageData: FavoritePackageData) => {
    setFavorites([...favorites, packageData]);
  };

  const deleteFavorites = (item: FavoritePackageData) => {
    setFavorites(favorites.filter((fav) => fav._id !== item._id));
  };

  return (
    <div className="results-container">
      <Table className="results-table" striped bordered hover>
        <thead>
          <tr>
            <th>Package</th>
            <th style={{ whiteSpace: "nowrap" }}>Latest Version</th>
            <th>Description</th>
            <th>Homepage</th>
            <th>Favorite?</th>
          </tr>
        </thead>
        <tbody>
          {packageDataList.map((packageData, index) => (
            <tr key={index}>
              <td>{packageData.name}</td>
              <td>{packageData.version}</td>
              <td>{packageData.description}</td>
              <td>
                <a
                  href={packageData.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {packageData.homepage}
                </a>
              </td>

              <FavoriteStar
                packageData={packageData}
                favorites={favorites}
                addFavorites={addFavorite}
                deleteFavorites={deleteFavorites}
              />
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Results;
