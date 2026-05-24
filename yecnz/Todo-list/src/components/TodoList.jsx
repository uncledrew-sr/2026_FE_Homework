import TodoItem from './TodoItem.jsx';

function TodoList({ todos, onDelete, onToggle }) {
  if (todos.length === 0) {
    return <p className="empty">비어있어요.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TodoList;
