function QuizFinished({ correct, wrong, onHome }) {
  const total = correct + wrong;
  const ratio = correct / total;

  let emoji, message;
  if (ratio >= 0.8) {
    emoji = '🏆';
    message = '강아지 박사님이시네요!';
  } else if (ratio >= 0.5) {
    emoji = '😊';
    message = '꽤 잘 아시는데요~?';
  } else {
    emoji = '🐕';
    message = '다음엔 더 잘할 수 있어요!';
  }

  return (
    <div className="finished-container">
      <div className="finished-card">
        <span className="finished-emoji">{emoji}</span>
        <h1 className="finished-title">퀴즈 종료!</h1>

        <p className="finished-score correct">
          맞힌 개수: <strong>{correct}</strong>
        </p>
        <p className="finished-score wrong">
          틀린 개수: <strong>{wrong}</strong>
        </p>

        <p className="finished-message">{message}</p>

        <button onClick={onHome} className="finished-home-btn">
          🏠 홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default QuizFinished;