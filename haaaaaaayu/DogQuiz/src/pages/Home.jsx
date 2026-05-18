import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <span className="home-emoji">🐶</span>
        <h1 className="home-title">강아지 종 맞히기 퀴즈</h1>
        <p className="home-desc">
          강아지 사진을 보고 어떤 종인지 맞춰보세요!<br />
          총 10문제가 출제됩니다 🐾
        </p>

        <button
          onClick={() => navigate("/quiz")}
          className="home-start-btn"
        >
          퀴즈 시작하기
        </button>

        <div className="home-paws">🐾🐾🐾</div>
      </div>
    </div>
  );
}

export default Home;