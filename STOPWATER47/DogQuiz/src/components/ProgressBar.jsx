function ProgressBar({ results }) {
  const total = results.length;
  const correct = results.filter((r) => r === 'correct').length;
  const wrong = results.filter((r) => r === 'wrong').length;
  const remaining = total - correct - wrong;

  return (
    <footer className="progress-dock">
      <div className="score-row">
        <span>정답 {correct}</span>
        <span>오답 {wrong}</span>
        <span>남은 문제 {remaining}</span>
      </div>
      <div className="progress-track" aria-label="퀴즈 진행 상황">
        {results.map((result, index) => (
          <span
            key={index}
            className={`progress-step ${result || 'pending'}`}
          />
        ))}
      </div>
    </footer>
  );
}

export default ProgressBar;
