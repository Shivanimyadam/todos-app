import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList.jsx'


function App() {

  const [todos, setTodos] = useState(() => {
    // initialize from local storage safely
    try {
      const storedTodo = JSON.parse(localStorage.getItem("todos"));
      return storedTodo ? storedTodo : []
    } catch (e) {
      console.error(e);
      return [];
    }
  });
  const [taskName, setTaskName] = useState('');
  const [filter, setFilter] = useState('all');

  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (!taskName.trim()) return;
    if (editTodo) {
      // update existing todo
      setTodos(todos.map(todo => todo.id === editTodo.id ? { ...todo, name: taskName } : todo));
      setEditTodo(null);
    } else {
      // add new todo
      setTodos(
        [...todos,
        {
          id: crypto.randomUUID(),
          name: taskName,
          completed: false
        }
        ]
      );
    }
    setTaskName('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  };

  const deleteTask = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const filterTodo = todos?.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const editTask = (item) => {
    setEditTodo(item);
    setTaskName(item.name);
  };

  return (
    <>
      <h1>TODOs APP</h1>
      <div
        className='input-row'
      >
        <input
          style={{ width: '300px' }}
          id="task-name"
          placeholder="enter task..."
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>{editTodo ? "Update Task" : "Add Task"}</button>
      </div>
      <div>
        <p>Todo List</p>
        <div
          className='filters'
        >
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("pending")}>Pending</button>

        </div>
        <TodoList
          todos={filterTodo}
          editTodo={editTodo}
          toggleTodo={toggleTodo}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      </div>
    </>
  )
}

export default App
