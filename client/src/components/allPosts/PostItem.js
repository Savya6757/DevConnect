import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatData";
import { addLike, removeLike, deletePost } from "../../actions/postActions";

const PostItem = (props) => {
  const { _id, text, name, avatar, user, likes, comments, date } = props.post;
  const dispatch = useDispatch();

  const likePostHandler = () => {
    dispatch(addLike(_id));
  };
  const unlikePostHandler = () => {
    dispatch(removeLike(_id));
  };
  const deletePostHandler = () => {
    dispatch(deletePost(_id));
  };

  const auth = useSelector((state) => state.auth);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profiles/${user}`}>
          <img className="round-img" src={avatar} alt="user gravatar..." />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {formatDate(date)}</p>
        {props.showActions && (
          <Fragment>
            <button type="button" className="btn btn-light" onClick={likePostHandler}>
              <i className="fas fa-thumbs-up"></i> {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button type="button" className="btn btn-light" onClick={unlikePostHandler}>
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && <span className="comment-count">{comments.length}</span>}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button type="button" className="btn btn-danger" onClick={deletePostHandler}>
                <i class="fa-solid fa-trash"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

export default PostItem;
