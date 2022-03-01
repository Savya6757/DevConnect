import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = (props) => {
  const { profile } = props;
  const { user } = props.profile;

  return (
    <div className="profile bg-light">
      <img className="round-img" src={user.avatar} alt="user gravatar..." />
      <div>
        <h2>{user.name}</h2>
        <p>
          {profile.status} {profile.company && <span> at {profile.company}</span>}
        </p>
        <p className="my-1">{profile.location && <span>{profile.location}</span>}</p>
        <Link to={`/profiles/${user._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {profile.skills.slice(0, 5).map((skill, i) => (
          <li className="text-primary" key={i}>
            <i className="fas fa-check m-1"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
