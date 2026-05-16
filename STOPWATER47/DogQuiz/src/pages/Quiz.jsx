import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BREED_KO, KO_TO_BREED } from '../data/breeds.js';
import ProgressBar from '../components/ProgressBar.jsx';
import QuestionCard from '../components/QuestionCard.jsx';
import QuizFinished from '../components/QuizFinished.jsx';

const TOTAL_QUESTIONS = 10;

function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState(Array(TOTAL_QUESTIONS).fill(null));
  const [answer, setAnswer] = useState('');
  const [actual, setActual] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const breeds = Object.keys(BREED_KO);
        const pickedQuestions = [];

        for (let i = 0; i < TOTAL_QUESTIONS; i += 1) {
          const correctBreed = breeds[Math.floor(Math.random() * breeds.length)];
          const response = await axios.get(
            `https://dog.ceo/api/breed/${correctBreed}/images/random`
          );

          pickedQuestions.push({
            imageUrl: response.data.message,
            breed: correctBreed,
          });
        }

        setQuestions(pickedQuestions);
      } catch (fetchError) {
        console.error(fetchError);
        setError('문제를 불러오지 못했어요. 잠시 후 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const currentQuestion = questions[index];
  const correct = results.filter((item) => item === 'correct').length;
  const wrong = results.filter((item) => item === 'wrong').length;

  const handleSubmit = () => {
    if (!currentQuestion || !answer.trim() || result !== null) return;

    const normalizedAnswer = answer.replace(/\s/g, '').toLowerCase();
    const userBreed = KO_TO_BREED[normalizedAnswer];
    const isCorrect = userBreed === currentQuestion.breed;

    setActual(BREED_KO[currentQuestion.breed]);
    setResult(isCorrect ? 'correct' : 'wrong');
    setResults((prev) => {
      const next = [...prev];
      next[index] = isCorrect ? 'correct' : 'wrong';
      return next;
    });
  };

  const handleNext = () => {
    setAnswer('');
    setActual(null);
    setResult(null);
    setIndex((currentIndex) => currentIndex + 1);
  };

  const handleHome = () => navigate('/');

  if (loading) {
    return (
      <main className="app-screen centered-screen">
        <div className="loader" />
        <p>문제를 불러오는 중...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="app-screen centered-screen">
        <p className="error-message">{error}</p>
        <button className="primary-action" onClick={handleHome}>
          처음으로 돌아가기
        </button>
      </main>
    );
  }

  if (index >= TOTAL_QUESTIONS) {
    return <QuizFinished correct={correct} wrong={wrong} onHome={handleHome} />;
  }

  return (
    <main className="app-screen quiz-screen">
      <header className="quiz-header">
        <button className="icon-button" onClick={handleHome} aria-label="홈으로">
          ←
        </button>
        <div>
          <p>Dog Quiz</p>
          <h1>견종 맞히기</h1>
        </div>
        <span className="mini-score">{correct}점</span>
      </header>

      <QuestionCard
        question={currentQuestion}
        index={index}
        total={TOTAL_QUESTIONS}
        answer={answer}
        setAnswer={setAnswer}
        result={result}
        actual={actual}
        onSubmit={handleSubmit}
        onNext={handleNext}
      />

      <ProgressBar results={results} />
    </main>
  );
}

export default Quiz;
