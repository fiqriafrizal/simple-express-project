const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book-controller");
const bookReviewRoutes = require("./book_review-route");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.createBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

router.use("/:bookId/reviews", bookReviewRoutes);


module.exports = router;