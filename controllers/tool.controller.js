const { validationResult } = require("express-validator");
const toolModel = require("../models/tool.model");
const { Error } = require("mongoose");

let getAllTools = async (req, res) => {
  try {
    const tools = await toolModel.find();
    res.status(200).json(tools);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};

let getToolById = async (req, res) => {
  try {
    const toolId = req.params.toolId;
    const tool = await toolModel.findById(toolId);
    if (!tool) {
      return res.status(404).json({ message: "tool is not found" });
    }
    res.status(200).json({ tool: tool });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};

let createTool = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const createdTool = await toolModel.create(req.body);

    res.status(201).json(createdTool);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};

let editTool = async (req, res) => {
  try {

    const tool = await toolModel.findByIdAndUpdate(req.params.toolId , req.body,{new:true});

    if (!tool) {
      return res.status(404).json({
        message: "Tool not found",
      });
    }

    res.status(200).json(tool);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};
let deleteTool = async (req, res) => {
  try {

    const deletedTool = await toolModel.findByIdAndDelete(
      req.params.toolId
    );

    if (!deletedTool) {
      return res.status(404).json({
        message: "Tool not found",
      });
    }

    res.status(204).send();

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "internal server error",
      error: err.message,
    });
  }
};

module.exports = {
  deleteTool,
  editTool,
  createTool,
  getToolById,
  getAllTools,
};
