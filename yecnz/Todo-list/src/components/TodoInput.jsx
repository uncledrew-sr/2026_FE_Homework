import { useState } from 'react';

function TodoInput({ onAdd }) {
  const [input, setInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!input.trim()) return;

    await onAdd(input.trim());
    setInput('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        aria-label="새 할 일"
        onChange={(event) => setInput(event.target.value)}
        placeholder="새 할 일 입력"
        value={input}
      />
      <button aria-label="할 일 추가" type="submit">
        +
      </button>
    </form>
  );
}

export default TodoInput;
