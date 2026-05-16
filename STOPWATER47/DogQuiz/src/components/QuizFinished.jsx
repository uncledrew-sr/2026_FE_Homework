function QuizFinished({ correct, wrong, onHome }) {
  const total = correct + wrong;
  const percent = total ? Math.round((correct / total) * 100) : 0;

  return (
    <main className="app-screen finish-screen">
      <section className="finish-card">
        <div className="finish-emoji" aria-hidden="true">
          🐾
        </div>
        <p className="status-pill">퀴즈 완료</p>
        <h1>{percent}점</h1>
        <p className="finish-copy">
          총 {total}문제 중 {correct}문제를 맞혔어요.
        </p>

        <div className="summary-grid">
          <div>
            <span>{correct}</span>
            <p>정답</p>
          </div>
          <div>
            <span>{wrong}</span>
            <p>오답</p>
          </div>
        </div>

        <button className="primary-action" onClick={onHome}>
          처음으로 돌아가기
        </button>
      </section>
    </main>
  );
}

export default QuizFinished;
