import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/layouts/LandingPage";
import Navbar from "./components/layouts/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layouts/Alert";
import WrapperContainer from "./components/layouts/WrapperContainer";
import Dashboard from "./components/dashboard/Dashboard";
import ProfileForm from "./components/profile/ProfileForm";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/authActions";
import setToken from "./utils/userLoded";
import ProtectedRoutes from "./components/Route/ProtectedRoutes";
import AddExperience from "./components/profile/AddExperience";
import AddEducation from "./components/profile/AddEducation";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Fragment>
      <Navbar />
      <WrapperContainer>
        <Alert />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoutes component={Dashboard} />} />
          <Route path="/create-profile" element={<ProtectedRoutes component={ProfileForm} />} />
          <Route path="/edit-profile" element={<ProtectedRoutes component={ProfileForm} />} />
          <Route path="/add-experience" element={<ProtectedRoutes component={AddExperience} />} />
          <Route path="/add-education" element={<ProtectedRoutes component={AddEducation} />} />
        </Routes>
      </WrapperContainer>
    </Fragment>
  );
};

export default App;
