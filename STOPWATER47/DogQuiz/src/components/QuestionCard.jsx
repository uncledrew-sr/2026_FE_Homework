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
  const isAnswered = result !== null;

  return (
    <article className="question-card">
      <div className="question-top">
        <span className="question-count">
          {index + 1} / {total}
        </span>
        <span className="question-label">이 견종은?</span>
      </div>

      <div className="dog-photo-wrap">
        <img src={question.imageUrl} alt="퀴즈에 나온 강아지" />
      </div>

      <label className="answer-field">
        <span>견종 이름</span>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isAnswered) onSubmit();
          }}
          disabled={isAnswered}
          placeholder="예: 비글"
        />
      </label>

      {result === null ? (
        <button className="primary-action" onClick={onSubmit}>
          정답 확인
        </button>
      ) : (
        <div className={`result-box ${result}`}>
          <strong>{result === 'correct' ? '정답이에요!' : '아쉬워요!'}</strong>
          <p>정답은 {actual}입니다.</p>
          <button className="secondary-action" onClick={onNext}>
            다음 문제
          </button>
        </div>
      )}
    </article>
  );
}

export default QuestionCard;
