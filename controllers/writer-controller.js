const { Writer } = require("../models");
const bcrypt = require('bcrypt');

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
  try {
    const { name, email, bio } = req.body;
    const writer = await Writer.create({ name, email, bio });
    res.status(201).json({
      message: "Writer created successfully",
      data: writer
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating writer", error: error.message });
  }
};

const updateWriter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;
    const writer = await Writer.findByPk(id);
    if (!writer) {
      return res.status(404).json({ message: "Writer not found" });
    }
    await writer.update({ name, email, bio });
    res.json({
      message: "Writer updated successfully",
      data: writer
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating writer", error: error.message });
  }
};

const deleteWriter = async (req, res) => {
  try {
    const { id } = req.params;
    const writer = await Writer.findByPk(id);
    if (!writer) {
      return res.status(404).json({ message: "Writer not found" });
    }
    await writer.destroy();
    res.json({ message: "Writer deleted successfully" });
  } catch (error) {
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