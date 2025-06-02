require("dotenv").config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");

const PORT = 3000;
const app = express();

app.use(express.static("public"));

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
