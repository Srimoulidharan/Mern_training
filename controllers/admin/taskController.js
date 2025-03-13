const Task = require("../../models/admin/Task");

// Create Task
exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("assignedTo createdBy");
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
