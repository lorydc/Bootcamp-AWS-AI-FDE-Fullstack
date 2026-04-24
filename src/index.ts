import express from "express";
import movieRoutes from "./routes/movie.routes";
import directorRoutes from "./routes/director.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use(movieRoutes);
app.use(directorRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.use(errorHandler);

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

server.on("error", (err) => {
  console.log("Server error:", err);
});