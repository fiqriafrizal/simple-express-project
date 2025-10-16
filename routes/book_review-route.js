const express = require("express");
const router = express.Router({ mergeParams: true });
const bookReviewController = require("../controllers/book_review-controller");
const { validate } = require('../middleware/validate');
const { idParamsSchema, onlyBookIdParamsSchema, createBookReviewBodySchema, updateBookReviewBodySchema } = require('../validations/book_review.validation');


router.get("/", validate(onlyBookIdParamsSchema, 'params'), bookReviewController.getAllBookReviews);
router.get("/:id", validate(idParamsSchema, 'params'), bookReviewController.getBookReviewById);
router.post("/", validate(onlyBookIdParamsSchema, 'params'), validate(createBookReviewBodySchema, 'body'), bookReviewController.createBookReview);
router.put("/:id", validate(idParamsSchema, 'params'), validate(updateBookReviewBodySchema, 'body'), bookReviewController.updateBookReview);
router.delete("/:id", validate(idParamsSchema, 'params'), bookReviewController.deleteBookReview);


module.exports = router;