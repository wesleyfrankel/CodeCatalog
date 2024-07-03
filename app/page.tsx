"use client";
import Search from "./components/Search";
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000";

export default function Home() {
  useEffect(() => {
    GetFavorites();
  }, []);

  const GetFavorites = () => {
    fetch(API_BASE + "/favorites")
      .then((res) => res.json())
      .catch((err) => console.error("ERROR: ", err));
  };

  return (
    <>
      <h1 className="title">Capstone</h1>
      <Search />
    </>
  );
}
