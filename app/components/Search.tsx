"use client";
import React, { useState } from "react";
import GetData from "../api/npm";
import Results from "./Results";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../globals.css";
import { FavoritePackageData, PackageData } from "../interfaces/packageData";
import { GetFavorites } from "../api/favorites";

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [packageDataList, setPackageDataList] = useState<PackageData[]>([]);
  const [favorites, setFavorites] = useState<FavoritePackageData[]>([]);

  const handleClick = async () => {
    const data = await GetData(inputValue);
    if (data && data.version !== "0.0.0") {
      setPackageDataList((prevList) => [data, ...prevList]);
      setInputValue("");
    } else {
      alert("Package does not have the required version.");
    }
  };

  const handleClear = () => {
    setInputValue("");
    setPackageDataList([]);
    setFavorites([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleClick();
  };

  const handleGetFavorites = async () => {
    try {
      const favorites = await GetFavorites();
      setFavorites(favorites);
    } catch (error) {
      console.error("Error fetching favorites", error);
    }
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="col-md-8"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                placeholder="Search"
                className="search-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="button"
                className="search-button"
                onClick={handleClick}
              >
                Get Data
              </button>
              <button
                type="button"
                className="search-button"
                style={{ marginLeft: "10px" }}
                onClick={handleGetFavorites}
              >
                Get Favorites
              </button>
              <button
                type="button"
                className="search-button"
                style={{ marginLeft: "10px" }}
                onClick={handleClear}
              >
                Clear
              </button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Results packageDataList={packageDataList} />
      <br />
      {favorites.length > 0 && (
        <>
          <h3 style={{ textAlign: "center" }}>Favorites:</h3>
          <Results packageDataList={favorites} />
        </>
      )}
    </>
  );
};

export default Search;
