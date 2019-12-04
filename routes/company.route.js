const express = require("express");
const router = express.Router();

const company = require("../controllers/company.controller");

router.get("/companies", company.find);

router.post("/create", company.create);

router.get("/notes/:id", company.notesByCompanyId);

module.exports = router;
