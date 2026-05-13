import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../src/pages/Home.jsx';
import Quiz from '../../src/pages/Quiz.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
