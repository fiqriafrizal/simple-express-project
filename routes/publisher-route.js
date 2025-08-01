const express = require("express");
const router = express.Router();
const publisherController = require("../controllers/publiser-controller");

router.get("/", publisherController.getAllPublishers);
router.get("/:id", publisherController.getPublisherById);
router.post("/", publisherController.createPublisher);
// router.put("/:id", publisherController.updatePublisher);
// router.delete("/:id", publisherController.deletePublisher);

module.exports = router;