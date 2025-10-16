const { Publisher } = require("../models");

const getAllPublishers = async (req, res) => {
    try {
        const publishers = await Publisher.findAll();
        res.json({
            message: "Get all publishers",
            data: publishers
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching publisher", error: error.message });
    }
};

const getPublisherById = async (req, res) => {
    try {
        const { id } = req.params;
        const publisher = await Publisher.findByPk(id);
        if (!publisher) {
            return res.status(404).json({ error: "Publisher not found" });
        }
        res.json({
            message: "Get publisher by id",
            data: publisher
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching publisher", error: error.message });
    }
};

const createPublisher = async (req, res) => {
    const transaction = await Publisher.sequelize.transaction();
    try {
        const { name } = req.body;
        const publisher = await Publisher.create({ name }, { transaction });
        await transaction.commit();
        res.status(201).json(publisher);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: "Error creating publisher", error: error.message });
    }
};

const updatePublisher = async (req, res) => {
    const transaction = await Publisher.sequelize.transaction();
    try {
        const { id } = req.params;
        const { name } = req.body;
        const publisher = await Publisher.findByPk(id, { transaction });
        if (!publisher) {
            await transaction.rollback();
            return res.status(404).json({ error: "Publisher not found" });
        }
        await publisher.update({ name }, { transaction });
        await transaction.commit();
        res.json({
            message: "Publisher updated successfully",
            data: publisher
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: "Error updating publisher", error: error.message });
    }
};

const deletePublisher = async (req, res) => {
    const transaction = await Publisher.sequelize.transaction();
    try {
        const { id } = req.params;
        const publisher = await Publisher.findByPk(id, { transaction });
        if (!publisher) {
            await transaction.rollback();
            return res.status(404).json({ error: "Publisher not found" });
        }
        await publisher.destroy({ transaction });
        await transaction.commit();
        res.json({ message: "Publisher deleted successfully" });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: "Error deleting publisher", error: error.message });
    }
};

module.exports = {
    getAllPublishers,
    getPublisherById,
    createPublisher,
    updatePublisher,
    deletePublisher
};


