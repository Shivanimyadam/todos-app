import { useEffect, useState } from "react";

function Todo() {

    const [todos, setTodos] = useState([]);
    const [taskName, setTaskName] = useState('');

    useEffect(() => {
        const storedTodo = JSON.parse(localStorage.getItem("todos"));
        if (storedTodo) {
            setTodos(storedTodo);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTask = () => {
        if (!taskName.trim()) return;
        setTodos(
            [...todos,
            {
                id: crypto.randomUUID(),
                name: taskName,
                completed: false
            }
            ]
        );
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

    console.log("list", todos);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <input
                    style={{ width: '300px' }}
                    id="task-name"
                    placeholder="enter task..."
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div>
                <p>Todo List</p>
                <ul>
                    {todos?.map((item) => (
                        <li key={item.id} style={{ display:'flex',flexDirection:'row',gap:'10px',justifyContent:'space-between', border: '2px solid red' }}>
                            <span
                                style={{ textDecoration: item?.completed ? "line-through" : "none" }}
                                onClick={() => toggleTodo(item.id)}
                            >{item.name}</span>
                            <button onClick={() => deleteTask(item.id)}>🗑️</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Todo;