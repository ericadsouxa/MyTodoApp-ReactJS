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
    <div class="relative flex h-16 items-center justify-between">
      <h1>Welcome to my Todo App</h1></div>
      <p>Enter a Todo</p>    
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2">
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
              alert("Cannot add empty todo");
            }
          }}
        >
          Add
        </button>
        <h1 className="text-3xl">Todo List</h1>
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
                  className="ml-5 h-5 w-5"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                <button
                  className="ml-5 bg-red-600 text-white rounded px-5 py-2"
                  onClick={() =>
                    setTodoList(todoList.filter((t) => t.id !== todo.id))
                  }
                >
                  Remove
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
