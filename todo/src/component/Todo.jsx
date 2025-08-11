import React, {useState} from "react";



function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (newTodo.trim() !== "") {
            try{
                const response = await fetch('http://localhost:3000/add-todo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: newTodo })
                });

                if (response.ok) {
                    const todo = await response.json();
                    setTodos(prevTodos => [...prevTodos, todo.text]);
                    setNewTodo("");
                } else {
                    console.error('Failed to add todo');
                }
            }
            catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <form>
                <input
                    type="text"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                />
                <button type="submit" onClick={handleAddTodo}>Add</button>
            </form>
            <ul>
                {todos.map((todo, idx) => (
                    <li key={idx}>{todo}</li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;