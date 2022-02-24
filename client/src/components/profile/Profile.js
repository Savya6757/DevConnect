import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleProfile } from "../../actions/profileActions";
import ProfileExperience from "./ProfileExperience";
import Spinner from "../layouts/Spinner";
import ProfileAbout from "./ProfileAbout";
import ProfileTop from "./ProfileTop";
import ProfileEducation from "./ProfileEducation";
import ProfileGitHub from "./ProfileGitHub";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleProfile(id));
  }, [dispatch, id]);

  const auth = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to profiles
          </Link>
          {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience key={experience._id} experience={experience} />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation key={education._id} education={education} />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            <ProfileGitHub username={profile.githubusername} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
