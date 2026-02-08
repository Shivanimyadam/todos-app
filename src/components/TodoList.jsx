import TodoItem from "./TodoItem";

function TodoList({ todos, editTodo, toggleTodo, editTask, deleteTask }) {
    return (

        <ul className="todo-list">
            {todos.map((item) => (
                <TodoItem
                    key={item.id}
                    item={item}
                    editTodo={editTodo}
                    toggleTodo={toggleTodo}
                    editTask={editTask}
                    deleteTask={deleteTask}
                />
            ))}
        </ul>

    );
};

export default TodoList;