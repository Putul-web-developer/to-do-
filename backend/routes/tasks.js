const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const title = req.body.title?.trim();
    const description = req.body.description?.trim() || ""; // ✅ added

    if (!title) {
      return res.status(400).json({ msg: "Task title is required." });
    }

    const task = await Task.create({
      title,
      description, // ✅ added
      user: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const title = req.body.title?.trim();
    const description = req.body.description?.trim(); // ✅ added

    if (!title) {
      return res.status(400).json({ msg: "Task title is required." });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { 
        title,
        description // ✅ added
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found." });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found." });
    }

    res.json({ msg: "Deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;