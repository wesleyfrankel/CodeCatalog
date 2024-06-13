import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import "../globals.css";

interface PackageData {
  name: string;
  version: string;
  description: string;
  homepage: string;
}

interface ResultsProp {
  packageDataList: PackageData[];
}

const Results: React.FC<ResultsProp> = ({ packageDataList }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleFavoriteClick = (packageName: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(packageName)) {
        newFavorites.delete(packageName);
      } else {
        newFavorites.add(packageName);
      }
      return newFavorites;
    });
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
              <td onClick={() => handleFavoriteClick(packageData.name)}>
                {favorites.has(packageData.name) ? (
                  <HiStar className="favorite-icon" />
                ) : (
                  <HiOutlineStar className="favorite-icon" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Results;
