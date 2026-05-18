import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="home-wrap">
      <h1 className="home-title">강아지 종 맞히기 퀴즈</h1>
      <p className="home-desc">강아지 사진을 보고 어떤 종인지 맞춰보세요! (총 10문제)</p>

      <div className="home-card">
        <button
          onClick={() => navigate(`/quiz`)}
          className="start-btn"
        >
          <h2 className="btn-text">퀴즈 시작하기</h2>
        </button>
      </div>
    </div>
  );
}

export default Home;