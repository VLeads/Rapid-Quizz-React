import { Footer, Header } from "components";
import { Homepage, Rules } from "pages";
import { Questions } from "pages/questions/Questions";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/reset.css";

function App() {
  return (
    <div className="page-layout">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:quizId">
          <Route path="rules" element={<Rules />} />
          <Route path=":questionIndex" element={<Questions />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
