import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserEdit from "./pages/UserEdit";
import Calendar from "./pages/CalendarEdit";
import List from "./pages/List";
import { Provider, useDispatch } from "react-redux";
import store from "./reducer/store";
import { useEffect } from "react";
import { clearUser, loginUser } from "./reducer/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();
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

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/calendar">
            <Route index element={<Calendar />} />
            <Route path="list/:id" element={<List />} />
          </Route>
          <Route path="/useredit" element={<UserEdit />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
