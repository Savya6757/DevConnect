import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/layouts/LandingPage";
import Navbar from "./components/layouts/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layouts/Alert";
import WrapperContainer from "./components/layouts/WrapperContainer";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/authActions";
import setToken from "./utils/userLoded";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <Navbar />
      <WrapperContainer>
        <Alert />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </WrapperContainer>
    </Fragment>
  );
};

export default App;
