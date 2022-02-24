import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAccount, getUserProfile } from "../../actions/profileActions";
// import Spinner from "../layouts/Spinner";
import DashboardActions from "./DashboardActions";
import EducationList from "./EducationList";
import ExperienceList from "./ExperienceList";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const { profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const accountDeleteHandler = () => {
    dispatch(deleteAccount());
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          {profile.experience.length > 0 && <ExperienceList experience={profile.experience} />}
          {profile.education.length > 0 && <EducationList education={profile.education} />}
          <div className="my-3">
            <button className="btn btn-danger" onClick={accountDeleteHandler}>
              <i className="fa-solid fa-user-xmark"></i> Delete my account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
