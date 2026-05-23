import { useState } from 'react';

const CAT_FACT_URL = 'https://meowfacts.herokuapp.com/?lang=kor-ko';

function CatFactBox() {
  const [fact, setFact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCatFact = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(CAT_FACT_URL);
      if (!response.ok) {
        throw new Error('Cat Facts API request failed');
      }

      const data = await response.json();
      if (!data.data?.[0]) {
        throw new Error('Cat fact is empty');
      }

      setFact(data.data[0]);
    } catch {
      setError('잠시 후 다시 눌러주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="cat-box">
      <p>Cat fact</p>
      <button onClick={fetchCatFact} type="button">
        고양이 상식 뽑기
      </button>

      {isLoading && <span>불러오는 중...</span>}
      {error && <span className="cat-error">{error}</span>}
      {fact && !isLoading && <strong>{fact}</strong>}
    </aside>
  );
}

export default CatFactBox;
