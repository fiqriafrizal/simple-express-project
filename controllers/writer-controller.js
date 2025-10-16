const { Writer } = require("../models");
const Joi = require('joi');
const { z } = require("zod");
const { createWriterSchema } = require("../validations/writer.validation");

const getAllWriters = async (req, res) => {
  try {
    const writers = await Writer.findAll();
    res.json({
      message: "Get all writers",
      data: writers
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching writers", error: error.message });
  }
};

const getWriterById = async (req, res) => {
  try {
    const { id } = req.params;
    const writer = await Writer.findByPk(id);
    if (!writer) {
      return res.status(404).json({ message: "Writer not found" });
    }
    res.json({
      message: "Get writer by id",
      data: writer
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching writer", error: error.message });
  }
};

const createWriter = async (req, res) => {
  const transaction = await Writer.sequelize.transaction();
  try {
    const userSchema = z.object({
      name: z.string(),
      email: z.string(),
      bio: z.string(),
    });

    const input = userSchema.safeParse(req.body);
    if (!input.success) {
      // await transaction.rollback();
      const error = error._zod.def;
      res.status(400).json({ message: input.error.message });
    }
    
    const writer = await Writer.create(req.body, { transaction });
    await transaction.commit();
    
    res.status(201).json({
      message: "Writer created successfully",
      data: writer
    }); 

  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ message: error.message });
  }
};

const updateWriter = async (req, res) => {
  const transaction = await Writer.sequelize.transaction();
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;
    const writer = await Writer.findByPk(id, { transaction });
    if (!writer) {
      return res.status(404).json({ message: "Writer not found" });
    }
    await writer.update({ name, email, bio }, { transaction });
    await transaction.commit();
    res.json({
      message: "Writer updated successfully",
      data: writer
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error updating writer", error: error.message });
  }
};

const deleteWriter = async (req, res) => {
  const transaction = await Writer.sequelize.transaction();
  try {
    const { id } = req.params;
    const writer = await Writer.findByPk(id, { transaction });
    if (!writer) {
      return res.status(404).json({ message: "Writer not found" });
    }
    await writer.destroy({ transaction });
    await transaction.commit();
    res.json({ message: "Writer deleted successfully" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error deleting writer", error: error.message });
  }
};

module.exports = {
  getAllWriters,
  getWriterById,
  createWriter,
  updateWriter,
  deleteWriter
};