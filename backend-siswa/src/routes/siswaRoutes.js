const express = require("express");
const router = express.Router();

const SiswaController = require("../controllers/SiswaController");

router.get("/", (req, res) => SiswaController.getAllSiswa(req, res));
router.post("/", (req, res) => SiswaController.createSiswa(req, res));
router.put("/:id", (req, res) => SiswaController.updateSiswa(req, res));
router.delete("/:id", (req, res) => SiswaController.deleteSiswa(req, res));

module.exports = router;
