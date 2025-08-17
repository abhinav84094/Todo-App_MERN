import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';    
dotenv.config();
import bodyParser from 'body-parser';
import connectDB from './db/dbConnection.js';
import Todo from './models/todoModel.js';
import { addTodo, deleteTodo, getTodos, updateTodo } from './controller/todoController.js';
import todoRoutes from './routes/todoRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Todo API!');
});


app.use('/api', todoRoutes);


app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});



// Export the app for testing purposes
export default app;