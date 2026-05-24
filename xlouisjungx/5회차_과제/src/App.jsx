import { useState, useEffect } from 'react';
import './App.css';

const BASE_URL = 'http://localhost:3001';
// 🔥 내 컴퓨터 백그라운드에 실행 중인 Ollama API 주소
const OLLAMA_URL = 'http://localhost:11434/api/generate';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('todo');

  // 🔥 AI 분석 리포트 및 로딩 상태 추가
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(`${BASE_URL}/todos`);
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;

    const response = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input, completed: false }),
    });

    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleTodo = async (todo) => {
    const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    });

    const updated = await response.json();
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTodo = async (id) => {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });

    setTodos(todos.filter((t) => t.id !== id));
  };

  // 🔥 Ollama AI에게 오늘 하루 분석 및 다음 작전 추천 받기
  const analyzeTodayQuests = async () => {
    if (todos.length === 0) {
      setAiAnalysis('현재 등록된 퀘스트가 없어 분석할 작전이 없습니다.');
      return;
    }

    setIsAiLoading(true);
    setAiAnalysis('지휘통제실에서 오늘 자 작전을 분석 중입니다...');

    // Ollama에게 보낼 퀘스트 목록 문자열 가공
    const todoListString = todos
      .map((t) => `- ${t.title} [${t.completed ? '격파 완료' : '수행 중'}]`)
      .join('\n');

    try {
      const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gemma2:2b', // 본인이 Ollama로 다운로드한 모델명 (gemma2:2b, llama3 등)
          prompt: `너는 게임 속 든든하고 냉철한 퀘스트 전술 지휘관이야. 
오늘 플레이어가 수행한 작전 내역은 다음과 같아:
${todoListString}

이 내역을 바탕으로 오늘 하루를 평가해주고, '다음 계획으로 어떤 방향의 작전을 수행하면 좋을지' 전술적인 조언을 1가지만 추천해줘.
답변 조건:
1. 무조건 친절하면서도 격려하는 군대 지휘관 말투(~군, ~바란다 등 게임 톤앤매너)로 작성해줘.
2. 줄글로 3문장 이내로 짧고 강렬하게 핵심만 말해줘.`,
          stream: false, // 브라우저에서 한 번에 깔끔하게 받기 위해 false 설정
        }),
      });

      const data = await response.json();
      setAiAnalysis(data.response);
    } catch (error) {
      console.error(error);
      setAiAnalysis(
        '지휘통제실 통신 두절. Ollama 프로그램이 켜져 있는지, CORS 설정이 되었는지 확인하십시오.',
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (activeTab === 'todo') return !todo.completed;
    if (activeTab === 'completed') return todo.completed;
    return true;
  });

  return (
    <div id="center">
      <h1>Quest Board</h1>

      {/* 입력 영역 */}
      <div className="input-group">
        <input
          className="todo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="수행할 퀘스트를 입력하세요..."
        />
        <button className="btn-primary" onClick={addTodo}>
          추가
        </button>
      </div>

      {/* 탭 메뉴 영역 */}
      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => setActiveTab('todo')}
        >
          Active (수행 중)
        </button>
        <button
          className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Cleared (격파 완료)
        </button>
      </div>

      {/* 리스트 출력 영역 */}
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'cleared' : ''}`}
          >
            <div className="todo-item-left">
              {/* 격파 토글 버튼 */}
              <button className="btn-smash" onClick={() => toggleTodo(todo)}>
                {todo.completed ? '✓' : 'X'}
              </button>
              {/* 할 일 텍스트 */}
              <span className="todo-text">{todo.title}</span>
            </div>

            {/* 완전 소멸 버튼 */}
            <button className="btn-delete" onClick={() => deleteTodo(todo.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>

      {filteredTodos.length === 0 && (
        <p className="empty-message">
          현재 구역의 모든 퀘스트가 클리어되었습니다.
        </p>
      )}

      {/* 🔥 하단 작전 분석 결과창 및 버튼 추가 */}
      <div className="ai-section">
        <button
          className="btn-ai-report"
          onClick={analyzeTodayQuests}
          disabled={isAiLoading || todos.length === 0}
        >
          📊 오늘 하루 작전 디브리핑
        </button>

        {aiAnalysis && (
          <div className="ai-report-box">
            <div className="ai-report-title">📡 TACTICAL DEBRIEFING REPORT</div>
            <p className="ai-report-text">{aiAnalysis}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
