const express = require("express");
const router = express.Router();

const note_controller = require("../controllers/note.controller");

router.post("", note_controller.create);

router.get("", note_controller.findAll);

router.get("/:id", note_controller.find);

router.put("/:id", note_controller.update);

router.delete("/:id", note_controller.delete);

router.get("/search/:title", note_controller.search);

module.exports = router;
