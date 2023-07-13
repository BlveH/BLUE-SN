import express from "express";
import cors from "cors";

const app = express();

app.use(express.static("src/public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(cors());

app.get("/", (req, res) => {
  res.render("index");
});

export default app;
