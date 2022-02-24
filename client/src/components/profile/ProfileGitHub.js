import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRepos } from "../../actions/profileActions";

const ProfileGitHub = (props) => {
  const username = props.username;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRepos(username));
  }, [dispatch, username]);

  const repos = useSelector((state) => state.profile.repos);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos.map((repo) => (
        <div key={repo.id} className="repo bg-white p-1 my-1">
          <div>
            <h4>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark my-1">
              <i className="fa-solid fa-up-right-from-square"></i>
            </a>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
              <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
              <li className="badge badge-light">Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileGitHub;
