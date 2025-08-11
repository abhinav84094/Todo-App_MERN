import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';    
dotenv.config();
import bodyParser from 'body-parser';
import connectDB from './db/dbConnection.js';
import Todo from './models/todoModel.js';



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Todo API!');
});


app.post('/add-todo', async (req, res) => {
  const { text } = req.body;    
    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }
    try {
        const newTodo = new Todo({ text });
        await newTodo.save();
        res.status(201).json(newTodo);
    }
    catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    }   
    catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});







app.listen(PORT, async () => {
    await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
