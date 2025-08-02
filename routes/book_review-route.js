const express = require("express");
const router = express.Router({ mergeParams: true });
const bookReviewController = require("../controllers/book_review-controller");


router.get("/", bookReviewController.getAllBookReviews);
router.get("/:id", bookReviewController.getBookReviewById);
router.post("/", bookReviewController.createBookReview);
router.put("/:id", bookReviewController.updateBookReview);
router.delete("/:id", bookReviewController.deleteBookReview);


module.exports = router;