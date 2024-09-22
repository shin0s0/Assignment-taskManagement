const Task = require('../models/task');

// Create Task
exports.createTask = async (req, res) => {
    const { title, description, status, dueDate } = req.body;

    // Manual validation
    if (!title || !dueDate) {
        return res.status(400).json({ error: 'Title and due date are required.' });
    }

    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status. Allowed values are: pending, in-progress, completed.' });
    }

    try {
        // Log user info
        console.log('Creating task for user:', req.user);

        const task = new Task({
            title,
            description,
            status: status || 'pending', 
            dueDate,
            user: req.user 
        });
        
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Read all tasks for the authenticated user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    const { title, description, status, dueDate } = req.body;


    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status. Allowed values are: pending, in-progress, completed.' });
    }

    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.toString()) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;
        if (dueDate) task.dueDate = dueDate;

        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.toString()) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.remove();
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
