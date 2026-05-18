function ProgressBar({ results }) {
  const total = results.length;
  const correct = results.filter((r) => r === 'correct').length;
  const wrong = results.filter((r) => r === 'wrong').length;
  const remaining = total - correct - wrong;

  return (
    <div className="progress-container">
      <div className="progress-counts">
        <span className="progress-correct">✅ 맞힘 {correct}</span>
        <span className="progress-wrong">❌ 틀림 {wrong}</span>
        <span className="progress-remaining">🐾 남은 {remaining}</span>
      </div>
      <div className="progress-bar">
        {results.map((r, i) => (
          <div
            key={i}
            className={`progress-segment ${
              r === 'correct' ? 'correct' : r === 'wrong' ? 'wrong' : 'empty'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;