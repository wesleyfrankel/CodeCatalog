const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/code-catalog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch(console.error);

const Favorite = require("./app/models/Favorite.ts");

app.get("/favorites", async (req, res) => {
  const favorites = await Favorite.find();

  res.json(favorites);
});

app.post("/favorites", async (req, res) => {
  const favorite = new Favorite({
    name: req.body.name,
    version: req.body.version,
    description: req.body.description,
    homepage: req.body.homepage,
  });

  await favorite.save();
  res.json(favorite);
});

app.delete("/favorites/:id", async (req, res) => {
  const unFavorite = await Favorite.findByIdAndDelete(req.params.id);

  res.json(unFavorite);
});

app.listen(5000, () => console.log("Server started on port 5000"));
