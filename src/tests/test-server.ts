import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("OK EXPRESS");
});

app.listen(3000, () => {
  console.log("Express rodando");
});