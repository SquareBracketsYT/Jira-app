const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    estimatedTime: String
});

module.exports = mongoose.model("Task", TaskSchema);
