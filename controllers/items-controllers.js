const knex = require("knex")(require("../knexfile"));

const getAll = async (_req, res) => {
  try {
    const knittingpatternsFound = await knex("inventories");
    res.status(200).send(knittingpatternsFound);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOne = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const inventoriesFound = await knex
      .select("*")
      .from("inventories")
      .where("id", inventoryId)
      .first();
    if (inventoriesFound) {
      delete inventoriesFound.created_at;
      delete inventoriesFound.updated_at;
      res.status(200).json(inventoriesFound);
    } else {
      res.status(404).json({ error: "Inventory not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const postNew = async (req, res) => {
  try {
    const result = await knex("inventories").insert(req.body);
    res.send(result).status(200);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editExisting = async (req, res) => {
  try {
    const rowsUpdated = await knex("inventories")
      .where({ id: req.params.id })
      .update(req.body);
    res.status(200).send(rowsUpdated[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const erase = async (req, res) => {
  try {
    const inventoriesFound = await knex("inventories").where({
      id: req.params.id,
    });

    if (inventoriesFound?.length < 1) {
      res.sendStatus(404);
      return;
    } else {
      const inventoriesDeleted = await knex("inventories")
        .where({ id: req.params.id })
        .del();
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(400).send("Unable to delete requested resources at this time");
  }
};

const getItemId = async (_req, res) => {
  try {
    const itemsFound = await knex("items");
    const itemName = itemFound.map((warehouse) => {
      return {
        name: warehouse.item_name,
        id: warehouse.id,
      };
    });
    res.status(200).send(warehousesNames);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  getAll,
  getOne,
  postNew,
  //   editExisting,
  //   erase,
  getItemId,
};
