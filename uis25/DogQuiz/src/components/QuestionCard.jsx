// props:
//   - question: { imageUrl, breed } — 현재 문제
//   - index: 현재 문제 번호 (0부터)
//   - total: 전체 문제 수
//   - answer: 사용자가 입력한 답 (한국어)
//   - setAnswer: 답 변경 함수
//   - result: 'correct' | 'wrong' | null (null이면 아직 제출 전)
//   - actual: 실제 정답 (한국어, 제출 후 보여줌)
//   - onSubmit: 제출 버튼 핸들러
//   - onNext: 다음 문제 버튼 핸들러
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
    <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
      {/* 진행 상황: "문제 1 / 10" */}
      <p className="text-gray-500 mb-2">
        문제 {index + 1} / {total}
      </p>

      {/* 강아지 사진 */}
      <div className="flex justify-center mb-6">
        <img
          src={question.imageUrl}
          alt="강아지 사진"
          className="max-h-72 rounded-lg object-cover"
        />
      </div>

      {/* 견종 이름 입력 */}
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={result !== null}
        placeholder="견종 이름을 한국어로 입력 (예: 비글, 시바견, 푸들)"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg mb-4 focus:border-blue-500 outline-none"
      />

      {/* 제출 버튼 또는 결과 박스 (result 상태에 따라 분기) */}
      {result === null ? (
        // 아직 제출 전: 제출 버튼 표시
        <button
          onClick={onSubmit}
          disabled={!answer.trim()}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          제출
        </button>
      ) : (
        // 제출 후: 정답/오답 박스 + 다음 문제 버튼
        <div>
          <div
            className={`p-4 rounded-lg mb-4 text-center font-bold text-lg ${
              result === 'correct'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {result === 'correct' ? '정답!' : '틀렸어요!'}
            <p className="text-sm font-normal mt-1 text-gray-700">
              실제 정답: <strong>{actual ?? '없음'}</strong>
            </p>
          </div>
          <button
            onClick={onNext}
            className="w-full py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            다음 문제 →
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;