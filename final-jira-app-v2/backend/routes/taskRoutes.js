const express = require("express");
const router = express.Router();
const { suggestTasks, grammarCheck, predictTime, createTask, getAllTask } = require("../controllers/taskController");

router.get("/taskList", getAllTask);
router.post("/suggest", suggestTasks);
router.post("/grammar-check", grammarCheck);
router.post("/predict-time", predictTime);
router.post("/create", createTask);

module.exports = router;
