import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date,
        default: null
    }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
