// props:
//   - correct: 맞힌 개수
//   - wrong: 틀린 개수
//   - onHome: 홈으로 돌아가기 버튼 핸들러
function QuizFinished({ correct, wrong, onHome }) {
  return (
    <div className="finished-wrap">
      <div className="finished-card">
        <h1 className="finished-title">🏆 퀴즈 종료</h1>
        <p className="stat-chip correct-chip">
          맞힌 개수: <strong>{correct}</strong>개
        </p>
        <p className="stat-chip wrong-chip">
          틀린 개수: <strong>{wrong}</strong>개
        </p>
        <button
          onClick={onHome}
          className="home-back-btn"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default QuizFinished;