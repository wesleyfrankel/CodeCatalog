"use client";
import React, { useState } from "react";
import GetData from "./GetData";
import Results from "./Results";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../globals.css";

interface PackageData {
  name: string;
  version: string;
  description: string;
  homepage: string;
}

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [packageDataList, setPackageDataList] = useState<PackageData[]>([]);

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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleClick();
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="col-md-4"
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
                onClick={handleClear}
              >
                Clear
              </button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Results packageDataList={packageDataList} />
    </>
  );
};

export default Search;
