const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const user_controller = require("../controllers/user.controller");

router.post("", user_controller.register);

router.get("", auth, user_controller.getAll);

router.post("/login", user_controller.login);

router.delete("/:id", user_controller.delete);

router.post("/confirmation", user_controller.confirmation);

module.exports = router;
