require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5050;
const mysql2 = require("mysql2");
const knex = require("knex")(require("./knexfile"));

//middleware to parse req.body
app.use(express.json());
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.get("/items", async (_req, res) => {
  try {
    const data = await knex.select("*").from("knitting_patterns");
    console.log(data);
    res.json(data);
  } catch {
    res.status(500).send("Error getting users");
  }
});

app.post("/add", async (req, res) => {
  const { item } = req.body;

  // find (or create) the open order
  let order = await knex("orders").where({ opened: true }).first();

  if (!order) {
    console.log("in if statement");
    await knex("orders").insert({});
    order = await knex("orders").where({ opened: true }).first();
  }

  console.log(order);

  await knex("line_items").insert({ order_id: order.id, item_id: item.id });

  // add this item to line_items

  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
