import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="app-screen home-screen">
      <section className="home-hero">
        <div className="status-pill">10문제 · 견종 맞히기</div>
        <div className="dog-preview" aria-hidden="true">
          <span>🐶</span>
        </div>
        <h1>강아지 견종 퀴즈</h1>
        <p>
          강아지 사진을 보고 어떤 견종인지 맞혀보세요. 귀여움은 보너스,
          집중력은 필수입니다.
        </p>
      </section>

      <section className="home-panel" aria-label="퀴즈 정보">
        <div className="info-row">
          <span className="info-icon">📷</span>
          <div>
            <strong>랜덤 사진 출제</strong>
            <p>매번 다른 강아지 사진으로 10문제가 만들어져요.</p>
          </div>
        </div>
        <div className="info-row">
          <span className="info-icon">⌨️</span>
          <div>
            <strong>한글 견종 입력</strong>
            <p>예: 비글, 시바견, 포메라니안처럼 입력하면 됩니다.</p>
          </div>
        </div>
      </section>

      <button className="primary-action" onClick={() => navigate('/quiz')}>
        퀴즈 시작하기
      </button>
    </main>
  );
}

export default Home;
