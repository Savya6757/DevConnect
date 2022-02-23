import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { addExperience } from "../../actions/profileActions";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  company: "",
  location: "",
  from: "",
  current: false,
  to: "",
  description: "",
};

const AddExperience = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, company, location, from, current, to, description } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onCheckCurrentHandler = () => {
    setFormData((prevState) => ({ ...prevState, current: !current }));
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addExperience(formData, navigate));
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming positions that you have
        had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={formSubmitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            required
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            required
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Location"
            name="location"
            value={location}
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
            Current Job
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
            placeholder="Job Description"
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

export default AddExperience;
