import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer, Header, ProtectedRoute } from "components";
import { Homepage, Login, Result, Rules, Signup } from "pages";
import { Questions } from "pages/questions/Questions";

import "./App.css";
import { useTheme } from "context/theme-context";

function App() {
  const { theme } = useTheme();

  return (
    <div className="page-layout" data-theme={theme}>
      <div className="page-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/rules" element={<Rules />} />
            <Route path="/questions/:quizId" element={<Questions />} />
            <Route path="/result" element={<Result />} />
          </Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
        <Footer />
        <ToastContainer
          theme="colored"
          autoClose={2000}
          position="bottom-right"
        />
      </div>
    </div>
  );
}

export default App;
