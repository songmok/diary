import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Todo from "./pages/Todo";
import Home from "./pages/Home";
import UserEdit from "./pages/UserEdit";
import Calendar from "./pages/Calendar";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./reducer/store";
import { useEffect } from "react";
import { clearUser, loginUser } from "./reducer/userSlice";
import { IUser } from "./reducer/userType";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: IUser) => state.user);
  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (auth) => {
      if (auth) {
        dispatch(loginUser(auth));
      } else {
        dispatch(clearUser());
      }
    });
    return () => authChange();
  }, [dispatch]);
  console.log("유저정보", user);
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calendar">
            <Route index element={<Calendar />} />
            <Route path="todo/:id" element={<Todo />} />
          </Route>
          <Route path="/useredit" element={<UserEdit />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
