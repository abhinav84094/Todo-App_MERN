import express from 'express';
import { addTodo, getTodos, updateTodo, deleteTodo } from '../controller/todoController.js';

const router = express.Router();

// Add a new todo
router.post('/add-todo', addTodo);

// Get all todos
router.get('/todos', getTodos);

// Update a todo
router.put('/todos/:id', updateTodo);

// Delete a todo
router.delete('/todos/:id', deleteTodo);

export default router;
