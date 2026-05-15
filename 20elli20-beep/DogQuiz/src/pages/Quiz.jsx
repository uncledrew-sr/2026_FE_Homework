// React 훅
import { useState, useEffect } from 'react';
// React Router 훅 (페이지 이동)
import { useNavigate } from 'react-router-dom';
// HTTP 요청 라이브러리
import axios from 'axios';

// 분리된 데이터/컴포넌트들
import { BREED_KO, KO_TO_BREED } from '../data/breeds.js';
import QuestionCard from '../components/QuestionCard.jsx';
import QuizFinished from '../components/QuizFinished.jsx';
import ProgressBar from '../components/ProgressBar.jsx';

function Quiz() {
  const navigate = useNavigate();
  const onHome = () => navigate('/');

  // 한 번에 풀 문제 수
  const total = 10;

  // ===== 상태(state) =====
  // 각 문제: { imageUrl, breed }
  //   - imageUrl: 강아지 사진 URL
  //   - breed: 정답 견종 코드 (예: 'akita')
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0); // 현재 몇 번째 문제인지
  const [results, setResults] = useState(Array(total).fill(null)); // 각 문제의 결과
  const [answer, setAnswer] = useState(''); // 사용자가 입력한 답
  const [actual, setActual] = useState(null); // 화면에 보여줄 실제 정답 (한국어)
  const [result, setResult] = useState(null); // 'correct' | 'wrong' | null
  const [loading, setLoading] = useState(true);

  // ===== 사이드 이펙트: 마운트 시 문제 10개 만들기 =====
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const breeds = Object.keys(BREED_KO);
        const newQuestions = [];

        for (let i = 0; i < total; i++) {
          // 1. 정답 견종을 무작위로 뽑기
          const correctBreed =
            breeds[Math.floor(Math.random() * breeds.length)];

          // 2. 해당 견종 사진 한 장 받아오기
          const res = await axios.get(
            `https://dog.ceo/api/breed/${correctBreed}/images/random`
          );

          newQuestions.push({
            imageUrl: res.data.message,
            breed: correctBreed,
          });
        }

        setQuestions(newQuestions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // ===== 파생 변수 =====
  const correct = results.filter((r) => r === 'correct').length;
  const wrong = results.filter((r) => r === 'wrong').length;
  const currentQ = questions[index];

  // ===== 제출 핸들러 =====
  const handleSubmit = () => {
    if (!currentQ || !answer.trim()) return;

    // 사용자가 입력한 한국어 이름 → 견종 코드로 변환해서 비교
    const userBreed = KO_TO_BREED[answer.replace(/\s/g, '')];
    const isCorrect = userBreed === currentQ.breed;

    setActual(BREED_KO[currentQ.breed]);
    setResult(isCorrect ? 'correct' : 'wrong');
    setResults((prev) => {
      const next = [...prev];
      next[index] = isCorrect ? 'correct' : 'wrong';
      return next;
    });
  };

  // ===== 다음 문제로 이동 =====
  const handleNext = () => {
    setAnswer('');
    setActual(null);
    setResult(null);
    setIndex((i) => i + 1);
  };

  // ===== 조건부 렌더링: 로딩 =====
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">문제를 불러오는 중...</p>
      </div>
    );
  }

  // ===== 조건부 렌더링: 종료 화면 =====
  if (index >= total) {
    return <QuizFinished correct={correct} wrong={wrong} onHome={onHome} />;
  }

  // ===== 메인 화면: 문제 풀이 =====
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
      <div className="max-w-2xl w-full mx-auto flex-grow">
        {/* 상단: 제목 + 홈으로 버튼 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">강아지 종 맞히기</h1>
          <button
            onClick={onHome}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            ← 홈으로
          </button>
        </div>

        {/* 문제 카드 */}
        <QuestionCard
          question={currentQ}
          index={index}
          total={total}
          answer={answer}
          setAnswer={setAnswer}
          result={result}
          actual={actual}
          onSubmit={handleSubmit}
          onNext={handleNext}
        />
      </div>

      {/* 하단 진행 바 */}
      <ProgressBar results={results} />
    </div>
  );
}

export default Quiz;