import { useState, useEffect } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodoList(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]); //localstorage will only update when todoList changes

  const addTodo = () => {
    setTodoList([
      ...todoList,
      { title: todo, id: todoList.length + 1, completed: false },
    ]);
    setTodo(""); // Clear the input after adding
  };

  const toggleComplete = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
    
      <div className="flex flex-col items-center justify-center">
        <h1>My Todo</h1>
        <p>Manage task with ease</p>
        <input
          type="text"
          value={todo}
          className="p-2 m-2 border border-black"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="p-2 m-2 bg-blue-500 text-white rounded"
          onClick={() => {
            if (todo !== "") {
              addTodo();
              setTodo("");
            } else {
              alert("Please enter something");
            }
          }}
        >
          Add
        </button>
        <h1 className="text-3xl font-bold">Todo List</h1>
        <div className="flex flex-col">
          {todoList.map((todo) => {
            return (
              <div
                key={todo.id}
                className={`text-xl p-10 m-2 rounded-xl text-white ${
                  todo.completed ? "bg-green-400" : "bg-gray-400"
                }`}
              >
                {todo.title}
                <input
                  type="checkbox"
                  className="ml-5"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                <button
                  className="ml-5 bg-red-600 text-white rounded px-5 py-2"
                  onClick={() =>
                    setTodoList(todoList.filter((t) => t.id !== todo.id))
                  }
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
