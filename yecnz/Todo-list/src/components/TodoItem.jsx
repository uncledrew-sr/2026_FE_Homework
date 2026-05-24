function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li className={todo.completed ? 'todo-item done' : 'todo-item'}>
      <button
        aria-label={todo.completed ? '완료 취소' : '완료'}
        className="check"
        onClick={() => onToggle(todo)}
        type="button"
      />
      <span onClick={() => onToggle(todo)}>{todo.title}</span>
      <button
        aria-label="삭제"
        className="delete"
        onClick={() => onDelete(todo.id)}
        type="button"
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
