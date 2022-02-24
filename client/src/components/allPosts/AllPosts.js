import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../actions/postActions";
import Spinner from "../layouts/Spinner";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

const AllPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const { loading, allPosts } = useSelector((state) => state.post);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large primary-text">Posts</h1>
      <p className="lead">
        <i className="fas fas-user"></i> Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {allPosts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

export default AllPosts;
