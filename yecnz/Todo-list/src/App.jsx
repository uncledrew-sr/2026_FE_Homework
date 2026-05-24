import { useEffect, useMemo, useState } from 'react';
import CatFactBox from './components/CatFactBox.jsx';
import TodoInput from './components/TodoInput.jsx';
import TodoList from './components/TodoList.jsx';

const BASE_URL = 'http://localhost:3001';
const filters = ['Todo', 'Completed'];

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('Todo');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(`${BASE_URL}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch {
      setError('서버를 먼저 실행해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (title) => {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false }),
    });

    const newTodo = await response.json();
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const toggleTodo = async (todo) => {
    const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    });

    const updatedTodo = await response.json();
    setTodos((prevTodos) =>
      prevTodos.map((item) => (item.id === updatedTodo.id ? updatedTodo : item)),
    );
  };

  const deleteTodo = async (id) => {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = useMemo(() => {
    if (filter === 'Completed') return todos.filter((todo) => todo.completed);
    return todos.filter((todo) => !todo.completed);
  }, [filter, todos]);

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <main className="app">
      <div className="layout">
        <section className="todo-shell">
          <header className="top-bar">
            <h1>Todo</h1>
            <span>
              {completedCount}/{todos.length}
            </span>
          </header>

          <TodoInput onAdd={addTodo} />

          <div className="filter-row">
            {filters.map((item) => (
              <button
                className={filter === item ? 'filter active' : 'filter'}
                key={item}
                onClick={() => setFilter(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          {error && <p className="notice">{error}</p>}
          {isLoading ? (
            <p className="empty">불러오는 중...</p>
          ) : (
            <TodoList
              todos={filteredTodos}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
            />
          )}
        </section>

        <CatFactBox />
      </div>
    </main>
  );
}

export default App;
