import express from "express";
const app = express();

app.use(express.static("src/public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("index");
});

export default app;
