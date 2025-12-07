const express = require("express");
const { getAllTags } = require("../controllers/metaController");

const router = express.Router();

router.get("/tags", getAllTags);

module.exports = router;
