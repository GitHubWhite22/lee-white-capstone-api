require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5050;
const mysql2 = require("mysql2");
const knex = require("knex")(require("./knexfile"));

//middleware to parse req.body
app.use(express.json());
app.use(cors());

app.get("/items", async (_req, res) => {
  try {
    const data = await knex.select("*").from("knitting_patterns");
    console.log(data);
    res.json(data);
  } catch {
    res.status(500).send("Error getting users");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
