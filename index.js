require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const mysql = require("mysql");

app.listen(PORT, () => {
  console.log("app listening on " + PORT);
});
