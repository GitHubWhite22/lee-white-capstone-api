const router = require("express").Router();
const userController = require("../controllers/user-controller");

router.route("/").get(userController.index).post(userController.add);

router
  .route("/:id")
  .get(userController.findOne)
  .patch(userController.update)
  .delete(userController.remove);

router.route("/:id/posts").get(userController.posts);

module.exports = router;
