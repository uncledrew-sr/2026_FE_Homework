function QuestionCard({
  question,
  index,
  total,
  answer,
  setAnswer,
  result,
  actual,
  onSubmit,
  onNext,
}) {
  return (
    <div className="question-card">
      <p className="question-number">
        🐾 문제 {index + 1} / {total}
      </p>

      <div className="question-img-wrapper">
        <img
          src={question.imageUrl}
          alt="강아지 사진"
          className="question-img"
        />
      </div>

      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={result !== null}
        placeholder="견종 이름을 한국어로 입력 (예: 비글, 시바견)"
        className="question-input"
      />

      {result === null ? (
        <button
          onClick={onSubmit}
          disabled={!answer.trim()}
          className="submit-btn"
        >
          제출하기 ✨
        </button>
      ) : (
        <div>
          <div className={`result-box ${result}`}>
            {result === 'correct' ? '🎉 정답이에요!' : '😢 틀렸어요!'}
            <p className="result-actual">
              정답: <strong>{actual ?? '없음'}</strong>
            </p>
          </div>
          <button onClick={onNext} className="next-btn">
            다음 문제로 →
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;