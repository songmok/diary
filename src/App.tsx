import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Todo from "./pages/Todo";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
