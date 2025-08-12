import Todo from '../models/todoModel.js';

// Create a new todo
export const addTodo = async (req, res) => {
    try {
        const { text } = req.body;
        const todo = new Todo({ text });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
};

// Get all todos
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

// Update a todo
export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Todo not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Todo.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: 'Todo not found' });
        res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};
