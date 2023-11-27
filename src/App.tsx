import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Todo from "./pages/Todo";
import Home from "./pages/Home";
import UserEdit from "./pages/UserEdit";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/useredit" element={<UserEdit />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
