const express = require("express");
const router = express.Router();
const publisherController = require("../controllers/publiser-controller");
const { validate } = require('../middleware/validate');
const { idParamsSchema, createPublisherBodySchema, updatePublisherBodySchema } = require('../validations/publisher.validation');

router.get("/", publisherController.getAllPublishers);
router.get("/:id", validate(idParamsSchema, 'params'), publisherController.getPublisherById);
router.post("/", validate(createPublisherBodySchema, 'body'), publisherController.createPublisher);
router.put("/:id", validate(idParamsSchema, 'params'), validate(updatePublisherBodySchema, 'body'), publisherController.updatePublisher);
router.delete("/:id", validate(idParamsSchema, 'params'), publisherController.deletePublisher);


module.exports = router;
