import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSinglePost } from "../../actions/postActions";
import PostItem from "../allPosts/PostItem";
import Spinner from "../layouts/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = () => {
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.post);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn btn-dark">
        Go back
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      {post.comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}
    </Fragment>
  );
};

export default Post;
