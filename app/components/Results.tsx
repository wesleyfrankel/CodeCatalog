import axios from "axios";
import Table from "react-bootstrap/Table";
import GetData from "./GetData";
import Favorite from "./Favorite";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import React, { useState, useEffect } from "react";
import "../globals.css";

interface PackageData {
  name: string;
  version: string;
  description: string;
  homepage: string;
}

interface ResultsProp {
  currPackageData: string;
}

const Results: React.FC<ResultsProp> = ({ currPackageData }) => {
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (currPackageData) {
        const data = await axios.get(`/api/package/${currPackageData}`);
        setPackageData(data.data);
      }
    };
    fetchData();
  }, [currPackageData]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await axios.get(`/api/favorites`);
      setFavorites(response.data.map((fav: PackageData) => fav.name));
    };
    fetchFavorites();
  }, []);

  const toggleFavorite = async (packageName: string) => {
    if (favorites.includes(packageName)) {
      await axios.delete(`/api/favorites/${packageName}`);
      setFavorites(favorites.filter((name) => name !== packageName));
    } else {
      const favoriteData = {
        name: packageData?.name,
        version: packageData?.version,
        description: packageData?.description,
        homepage: packageData?.homepage,
      };
      await axios.post(`/api/favorites`, favoriteData);
      setFavorites([...favorites, packageName]);
    }
  };

  const isFavorite = (packageName: string) => favorites.includes(packageName);

  return (
    <div className="table-div">
      <Table
        className="results"
        striped
        bordered
        hover
        style={{ width: "900px" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th style={{ whiteSpace: "nowrap" }}>Latest Version</th>
            <th>Description</th>
            <th>Homepage</th>
            <th>Favorite?</th>
          </tr>
        </thead>
        <tbody>
          {packageData ? (
            <tr>
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
              <span
                className={`star-icon ${
                  isFavorite(packageData.name) ? "yellow" : ""
                }`}
                onClick={() => toggleFavorite(packageData.name)}
              >
                {isFavorite(packageData.name) ? <HiStar /> : <HiOutlineStar />}
              </span>
            </tr>
          ) : (
            <tr>
              <td colSpan={5}>No packages found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Results;
