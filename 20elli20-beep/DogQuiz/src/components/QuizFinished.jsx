// 퀴즈 종료 화면 컴포넌트
// 맞힌/틀린 개수와 홈으로 돌아가는 버튼을 보여줌
//
// props:
//   - correct: 맞힌 개수
//   - wrong: 틀린 개수
//   - onHome: 홈으로 돌아가기 버튼 핸들러
function QuizFinished({ correct, wrong, onHome }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">퀴즈 종료!</h1>
        <p className="text-2xl mb-2 text-green-600 font-semibold">
          맞힌 개수: {correct}
        </p>
        <p className="text-2xl mb-8 text-red-500 font-semibold">
          틀린 개수: {wrong}
        </p>
        <button
          onClick={onHome}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default QuizFinished;
