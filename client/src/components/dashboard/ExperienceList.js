import React, { Fragment } from "react";
import formatDate from "../../utils/formatData";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../actions/profileActions";

const ExperienceList = (props) => {
  const dispatch = useDispatch();
  const onDeleteHandler = (id) => {
    dispatch(deleteExperience(id));
  };
  const experiences = props.experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Now"}
      </td>
      <td>
        <button onClick={onDeleteHandler.bind(null, exp._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Past Experience</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

export default ExperienceList;
