const { BookReview } = require("../models");

const getAllBookReviews = async (req, res) => {
    try {
        const bookReviews = await BookReview.findAll({ where: { book_id: req.params.bookId }, include: ["book", "user"] });
        res.status(200).json({
            message: "Get all book reviews",
            data: bookReviews
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookReviewById = async (req, res) => {
    try {
        const bookReview = await BookReview.findOne({ where: { id: req.params.id, book_id: req.params.bookId } });
        if (!bookReview) {
            return res.status(404).json({ message: "Book review not found" });
        }
        res.status(200).json({
            message: "Get book review by id",
            data: bookReviews
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBookReview = async (req, res) => {
    const transaction = await BookReview.sequelize.transaction();
    try {
        const bookReview = await BookReview.create(req.body, { transaction });
        await transaction.commit();
        res.status(201).json({
            message: "Book review created successfully",
            data: bookReview
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

const updateBookReview = async (req, res) => {
    const transaction = await BookReview.sequelize.transaction();
    try {
        const bookReview = await BookReview.findOne({ where: { id: req.params.id, book_id: req.params.bookId }, transaction });
        if (!bookReview) {
            await transaction.rollback();
            return res.status(404).json({ message: "Book review not found" });
        }
        await bookReview.update(req.body, { transaction });
        await transaction.commit();
        res.status(200).json({
            message: "Book review updated successfully",
            data: bookReview
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

const deleteBookReview = async (req, res) => {
    const transaction = await BookReview.sequelize.transaction();
    try {
        const bookReview = await BookReview.findOne({ where: { id: req.params.id, book_id: req.params.bookId }, transaction });
        if (!bookReview) {
            await transaction.rollback();
            return res.status(404).json({ message: "Book review not found" });
        }
        await bookReview.destroy({ transaction });
        await transaction.commit();
        res.status(200).json({
            message: "Book review deleted successfully"
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBookReviews,
    getBookReviewById,
    createBookReview,
    updateBookReview,
    deleteBookReview
};