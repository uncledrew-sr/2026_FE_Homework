import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BREED_KO, KO_TO_BREED } from '../data/breeds.js';
import QuestionCard from '../components/QuestionCard.jsx';
import QuizFinished from '../components/QuizFinished.jsx';
import ProgressBar from '../components/ProgressBar.jsx';

function Quiz() {
  const navigate = useNavigate();
  const onHome = () => navigate('/');

  const total = 10;

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState(Array(total).fill(null));
  const [answer, setAnswer] = useState('');
  const [actual, setActual] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const breeds = Object.keys(BREED_KO);
        const newQuestions = [];

        for (let i = 0; i < total; i++) {
          const correctBreed =
            breeds[Math.floor(Math.random() * breeds.length)];
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

  const correct = results.filter((r) => r === 'correct').length;
  const wrong = results.filter((r) => r === 'wrong').length;
  const currentQ = questions[index];

  const handleSubmit = () => {
    if (!currentQ || !answer.trim()) return;
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

  const handleNext = () => {
    setAnswer('');
    setActual(null);
    setResult(null);
    setIndex((i) => i + 1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <span className="loading-dog">🐕</span>
        <p className="loading-text">문제를 불러오는 중...</p>
      </div>
    );
  }

  if (index >= total) {
    return <QuizFinished correct={correct} wrong={wrong} onHome={onHome} />;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-inner">
        <div className="quiz-header">
          <h1 className="quiz-title">🐶 강아지 종 맞히기</h1>
          <button onClick={onHome} className="quiz-home-btn">
            ← 홈으로
          </button>
        </div>

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

      <ProgressBar results={results} />
    </div>
  );
}

export default Quiz;