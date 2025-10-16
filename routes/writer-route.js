const express = require("express");
const router = express.Router();
const writerController = require("../controllers/writer-controller");
const { validate } = require('../middleware/validate');
const { idParamsSchema, createWriterSchema, updateWriterSchema } = require('../validations/writer.validation');


router.get("/", writerController.getAllWriters);
router.get("/:id", validate(idParamsSchema, 'params'), writerController.getWriterById);
router.post("/", validate(createWriterSchema, 'body'), writerController.createWriter);
router.put("/:id", validate(idParamsSchema, 'params'), validate(updateWriterSchema, 'body'), writerController.updateWriter);
router.delete("/:id", validate(idParamsSchema, 'params'), writerController.deleteWriter);

module.exports = router;
