const { Book, Writer } = require('../models');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({ include: ["writer", "publisher"] });
        res.json({
            message: "Get all books",
            data: books
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({
            message: "Get book by id",
            data: book
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error: error.message });
    }
};

const createBook = async (req, res) => {
    const transaction = await Book.sequelize.transaction();
    try {
        const { title, author, genre, publicationYear } = req.body;
        const book = await Book.create({ title, author, genre, publicationYear }, { transaction });
        await transaction.commit();
        res.status(201).json({
            message: "Book created successfully",
            data: book
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: "Error creating book", error: error.message });
    }
}

const updateBook = async (req, res) => {
    const transaction = await Book.sequelize.transaction();
    try {
        const { id } = req.params;
        const { title, author, genre, publicationYear } = req.body;
        const book = await Book.findByPk(id, { transaction });
        if (!book) {
            await transaction.rollback();
            return res.status(404).json({ message: "Book not found" });
        }
        await book.update({ title, author, genre, publicationYear }, { transaction });
        await transaction.commit();
        res.json({
            message: "Book updated successfully",
            data: book
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: "Error updating book", error: error.message });
    }
}

const deleteBook = async (req, res) => {
    const transaction = await Book.sequelize.transaction();
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id, { transaction });
        if (!book) {
            await transaction.rollback();
            return res.status(404).json({ message: "Book not found" });
        }
        await book.destroy({ transaction });
        await transaction.commit();
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: "Error deleting book", error: error.message });
    }
}
module.exports = {
    getAllBooks, 
    getBookById, 
    createBook, 
    updateBook, 
    deleteBook
}