const express = require("express");
const router = express.Router();

const note_controller = require("../controllers/note.controller");

router.post("/create", note_controller.create);

router.get("/notes", note_controller.find);

router.get("/companies/:id", note_controller.companyByNoteId);

// router.get("/notes/:noteId", note_controller.findOne);

// router.put("/notes/:noteId", note_controller.update);

// router.delete("/notes/:noteId", note_controller.delete);

module.exports = router;
