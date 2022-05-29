import { Footer, Header } from "components";
import { useQuiz } from "context/data-context";
import { Homepage, Result, Rules } from "pages";
import { Questions } from "pages/questions/Questions";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/reset.css";

function App() {
  const { state } = useQuiz();

  return (
    <div className="page-layout">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/questions/:quizId" element={<Questions />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
