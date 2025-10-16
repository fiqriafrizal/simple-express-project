const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book-controller");
const bookReviewRoutes = require("./book_review-route");
const { validate } = require('../middleware/validate');
const { idParamsSchema, createBookBodySchema, updateBookBodySchema } = require('../validations/book.validation');

router.get("/", bookController.getAllBooks);
router.get("/:id", validate(idParamsSchema, 'params'), bookController.getBookById);
router.post("/", validate(createBookBodySchema, 'body'), bookController.createBook);
router.put("/:id", validate(idParamsSchema, 'params'), validate(updateBookBodySchema, 'body'), bookController.updateBook);
router.delete("/:id", validate(idParamsSchema, 'params'), bookController.deleteBook);

router.use("/:bookId/reviews", bookReviewRoutes);


module.exports = router;