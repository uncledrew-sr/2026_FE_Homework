// props:
//   - results: 각 문제의 결과 배열 ['correct' | 'wrong' | null, ...]
function ProgressBar({ results }) {
  const total = results.length;
  // 맞힌 개수, 틀린 개수, 남은 개수 계산
  const correct = results.filter((r) => r === 'correct').length;
  const wrong = results.filter((r) => r === 'wrong').length;
  const remaining = total - correct - wrong;

  return (
    <div className="max-w-2xl w-full mx-auto mt-4">
      {/* 위쪽 카운트 텍스트 */}
      <div className="flex justify-between text-sm mb-2 font-semibold">
        <span className="text-green-600">맞힘 {correct}</span>
        <span className="text-red-500">틀림 {wrong}</span>
        <span className="text-gray-500">남은 {remaining}</span>
      </div>
      {/* 진행 바: results 배열을 그대로 칸으로 매핑 */}
      <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden flex">
        {results.map((r, i) => (
          <div
            key={i}
            className={`h-full flex-1 transition-colors duration-300 ${
              r === 'correct'
                ? 'bg-green-500'
                : r === 'wrong'
                ? 'bg-red-500'
                : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;