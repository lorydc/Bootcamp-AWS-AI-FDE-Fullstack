import express from "express";
import movieRoutes from "./routes/movie.routes";
import directorRoutes from "./routes/director.routes";

const app = express();

app.use(express.json());

app.use(movieRoutes);
app.use(directorRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");

  
});