import React, { useEffect, Fragment } from "react";
import { getAllProfiles } from "../../actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layouts/Spinner";
import ProfileItem from "./ProfileItem";

const AllProfiles = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);

  const profiles = useSelector((state) => state.profile.profiles);
  const loading = useSelector((state) => state.profile.loading);

  return (
    <Fragment>
      {profiles === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with developers
          </p>
          <div className="profiles">
            {profiles && profiles.length > 0 ? (
              profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />)
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllProfiles;
