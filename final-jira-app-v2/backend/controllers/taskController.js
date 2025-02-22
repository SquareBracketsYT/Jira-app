const Task = require("../models/Task");
const { getTaskSuggestions, checkGrammar, predictTaskTime } = require("../services/aiService");

// Get Auto-Suggestions
exports.suggestTasks = async (req, res) => {
    const { input } = req.body;
    const suggestions = await getTaskSuggestions(input);
    res.json({ suggestions });
};

// Grammar Check
exports.grammarCheck = async (req, res) => {
    const { text } = req.body;
    const corrections = await checkGrammar(text);
    res.json({ corrections });
};

// Predict Task Time
exports.predictTime = async (req, res) => {
    const { text } = req.body;
    const predictedTime = await predictTaskTime(text);
    res.json({ predictedTime });
};

// Create Task
exports.createTask = async (req, res) => {
    const { title, description, empName } = req.body;
    const estimatedTime = await predictTaskTime(description);
    const task = new Task({ title, description, estimatedTime, empName });
    await task.save();
    res.json(task);
};


exports.getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
      } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
      }
};
