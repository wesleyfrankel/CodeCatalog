const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb://localhost:27017";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const favoriteSchema = new mongoose.Schema({
  name: String,
  version: String,
  description: String,
  homepage: String,
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

app.use(cors());
app.use(bodyParser.json());

app.get("/api/package/:name", async (req, res) => {
  try {
    const packageName = req.params.name;
    const data = await GetData(packageName);
    res.json(data);
  } catch (error) {
    console.error("Error fetching package data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/favorites", async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/favorites", async (req, res) => {
  try {
    const favorite = new Favorite(req.body);
    await favorite.save();
    res.status(201).send(favorite);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/api/favorites/:id", async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
