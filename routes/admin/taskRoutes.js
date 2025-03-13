const express = require("express");
const { createTask, getTasks, updateTask } = require("../../controllers/admin/taskController");

const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);

module.exports = router;
