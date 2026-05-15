import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-3 text-gray-800">
        강아지 종 맞히기 퀴즈
      </h1>
      <p className="text-gray-600 mb-10">
        강아지 사진을 보고 어떤 종인지 맞춰보세요! (총 10문제)
      </p>

      <button
        onClick={() => navigate('/quiz')}
        className="bg-amber-500 hover:bg-amber-600 text-white p-8 rounded-2xl shadow-lg transition transform hover:-translate-y-1 max-w-md w-full"
      >
        <span className="block text-2xl font-bold mb-3">퀴즈 시작하기</span>
        <span className="block text-sm opacity-90">
          Dog CEO API에서 받아온 강아지 사진을 보고 견종을 직접 입력해요
        </span>
      </button>
    </div>
  );
}

export default Home;