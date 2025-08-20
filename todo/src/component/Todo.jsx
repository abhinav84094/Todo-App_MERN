import React, { useState, useEffect } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null); 
  const [editText, setEditText] = useState("");
  const [buttonVisible, setButtonVisible] = useState(true); // ✅ for Add button delay

  // 🔹 Fetch todos from DB on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos");
        if (response.ok) {
          const data = await response.json();
          setTodos(data); // [{_id:"...", text:"Buy milk"}]
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  // 🔹 Add new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      try {
        const response = await fetch("http://localhost:3000/add-todo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: newTodo }),
        });

        if (response.ok) {
          const todo = await response.json();
          setTodos((prevTodos) => [...prevTodos, todo]);
          setNewTodo("");

          // ✅ hide Add button for 3s
          setButtonVisible(false);
          setTimeout(() => setButtonVisible(true), 3000);
        }
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  // 🔹 Delete todo
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // 🔹 Start editing a todo
  const handleEdit = (todo) => {
    setEditId(todo._id);
    setEditText(todo.text);
  };

  // 🔹 Save edited todo
  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText }),
      });

      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, text: editText } : todo
          )
        );
        setEditId(null);
        setEditText("");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <form>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        {buttonVisible && (
          <button type="submit" onClick={handleAddTodo}>
            Add
          </button>
        )}
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {editId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(todo._id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {todo.text}
                <div>
                    <button onClick={() => handleEdit(todo)}>Edit</button>
                    <button onClick={() => handleDelete(todo._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
