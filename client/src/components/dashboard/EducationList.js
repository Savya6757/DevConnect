import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../actions/profileActions";
import formatDate from "../../utils/formatData";

const EducationList = (props) => {
  const dispatch = useDispatch();
  const onDeleteHandler = (id) => {
    dispatch(deleteEducation(id));
  };
  const educations = props.education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Now"}
      </td>
      <td>
        <button onClick={onDeleteHandler.bind(null, edu._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

export default EducationList;
