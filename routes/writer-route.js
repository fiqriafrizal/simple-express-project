const express = require("express");
const router = express.Router();
const writerController = require("../controllers/writer-controller");


router.get("/", writerController.getAllWriters);
router.get("/:id", writerController.getWriterById);
router.post("/", writerController.createWriter);
router.put("/:id", writerController.updateWriter);
router.delete("/:id", writerController.deleteWriter);

module.exports = router;
