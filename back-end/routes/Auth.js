const router = require("express").Router();
const authController = require("../controller/authController");
router.post("/register", authController.registerAdmin);
router.post("/login", authController.loginAdmin);
module.exports = router;
