function TodoItem({ item, editTodo, toggleTodo, editTask, deleteTask }) {
    return (
        <li className="todo-item">
            <span
                style={{ textDecoration: item?.completed ? "line-through" : "none" }}
                onClick={() => !editTodo && toggleTodo(item.id)}
            >{item.name}</span>
            <div className="todo-actions">
                <button onClick={() => editTask(item)}>✏️</button>
                <button onClick={() => deleteTask(item.id)}>❌</button>
            </div>
        </li>
    );
};

export default TodoItem;