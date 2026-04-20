import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("API running 🚀");
});

app.listen(3000, () => {
  console.log("Server running");
});