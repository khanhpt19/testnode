const express = require("express");
const router = express.Router();

const company = require("../controllers/company.controller");

router.get("", company.findAll);

router.post("", company.create);

router.put("/:id", company.update);

router.delete("/:id", company.delete);

router.get("/:id", company.find);

router.get("/notes/:id", company.notesByCompanyId);

module.exports = router;
