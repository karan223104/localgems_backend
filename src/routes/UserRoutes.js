const router = require("express").Router();
const userController = require("../controllers/UserController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/all", userController.getAllUsers);
router.get("/:id", userController.getUserById);

router.delete("/:id", userController.deleteUser);

module.exports = router;