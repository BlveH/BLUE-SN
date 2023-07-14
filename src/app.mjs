import express from "express";
import cors from "cors";
import { connect } from "./configs/connectDB.mjs";
import "dotenv/config";
const app = express();

connect();

app.use(express.static("src/public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.render("index");
});

export default app;
