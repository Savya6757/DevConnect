import React, { Fragment, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/layouts/LandingPage";
import Navbar from "./components/layouts/Navbar";
// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
import Alert from "./components/layouts/Alert";
import WrapperContainer from "./components/layouts/WrapperContainer";
// import Dashboard from "./components/dashboard/Dashboard";
// import ProfileForm from "./components/profile-form/ProfileForm";
// import AllProfiles from "./components/allProfiles/AllProfiles";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/authActions";
import setToken from "./utils/userLoded";
import ProtectedRoutes from "./components/Route/ProtectedRoutes";
// import AddExperience from "./components/profile-form/AddExperience";
// import AddEducation from "./components/profile-form/AddEducation";
// import Profile from "./components/profile/Profile";
// import AllPosts from "./components/allPosts/AllPosts";
// import Post from "./components/post/Post";
import store from "./store";
import { LOGOUT } from "./actions/types";
import Spinner from "./components/layouts/Spinner";

const Login = React.lazy(() => import("./components/auth/Login"));
const Register = React.lazy(() => import("./components/auth/Register"));
const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"));
const ProfileForm = React.lazy(() => import("./components/profile-form/ProfileForm"));
const AllProfiles = React.lazy(() => import("./components/allProfiles/AllProfiles"));
const AddExperience = React.lazy(() => import("./components/profile-form/AddExperience"));
const AddEducation = React.lazy(() => import("./components/profile-form/AddEducation"));
const Profile = React.lazy(() => import("./components/profile/Profile"));
const AllPosts = React.lazy(() => import("./components/allPosts/AllPosts"));
const Post = React.lazy(() => import("./components/post/Post"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    dispatch(loadUser());
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, [dispatch]);

  return (
    <Fragment>
      <Suspense fallback={<Spinner />}>
        <Navbar />
        <WrapperContainer>
          <Alert />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profiles" element={<AllProfiles />} />
            <Route path="/profiles/:id" element={<Profile />} />
            <Route path="/dashboard" element={<ProtectedRoutes component={Dashboard} />} />
            <Route path="/create-profile" element={<ProtectedRoutes component={ProfileForm} />} />
            <Route path="/edit-profile" element={<ProtectedRoutes component={ProfileForm} />} />
            <Route path="/add-experience" element={<ProtectedRoutes component={AddExperience} />} />
            <Route path="/add-education" element={<ProtectedRoutes component={AddEducation} />} />
            <Route path="/posts" element={<ProtectedRoutes component={AllPosts} />} />
            <Route path="/posts/:id" element={<ProtectedRoutes component={Post} />} />
          </Routes>
        </WrapperContainer>
      </Suspense>
    </Fragment>
  );
};

export default App;
