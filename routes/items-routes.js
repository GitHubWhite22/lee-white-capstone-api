// instock-api/routes
// /inventories-routes.js for ref

const router = require("express").Router();
const itemsController = require("../controllers/items-controllers");

router.route("/").get(itemsController.getAll).post(itemsController.postNew);

router.route("/:id").get(itemsController.getOne);
//   .patch(itemsController.editExisting)
//   .delete(itemsController.erase);

router.route("/warehousenames").get(itemsController.getItemId);

module.exports = router;
