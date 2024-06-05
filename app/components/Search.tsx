import React, { useState } from "react";
import Results from "./Results";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../globals.css";

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [currPackageData, setCurrPackageData] = useState<string | undefined>(
    ""
  );

  const handleClick = async () => {
    setCurrPackageData(inputValue);
  };

  return (
    <>
      <Row className="justify-content-center align-items-center">
        <Col xs="auto">
          <Form className="d-flex align-items-center">
            <Form.Group controlId="exampleForm.ControlInput1" className="mb-0">
              <Form.Control
                type="text"
                placeholder="Search"
                className="search-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Form.Group>
            <button
              type="button"
              className="search-button"
              onClick={handleClick}
            >
              Get Data
            </button>
          </Form>
        </Col>
      </Row>
      {currPackageData && <Results currPackageData={currPackageData} />}
    </>
  );
};

export default Search;
