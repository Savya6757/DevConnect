import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { addEducation } from "../../actions/profileActions";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  school: "",
  degree: "",
  fieldofstudy: "",
  from: "",
  current: false,
  to: "",
  description: "",
};

const AddEducation = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { school, degree, fieldofstudy, from, current, to, description } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onCheckCurrentHandler = () => {
    setFormData((prevState) => ({ ...prevState, current: !current }));
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addEducation(formData, navigate));
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Add your previous Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any School, College etc that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={formSubmitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or College"
            name="school"
            value={school}
            required
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree obtained"
            name="degree"
            value={degree}
            required
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Field of your study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <h4>* From Date</h4>
          <input type="date" name="from" value={from} onChange={onChangeHandler} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              onChange={onCheckCurrentHandler}
            />{" "}
            Current School or College
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={onChangeHandler} disabled={current} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Description"
            value={description}
            onChange={onChangeHandler}></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default AddEducation;
