import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatData";
import { removeComment } from "../../actions/postActions";

const CommentItem = (props) => {
  const { _id, text, name, avatar, user, date } = props.comment;
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const postId = props.postId;
  const deleteCommentHandler = () => {
    dispatch(removeComment(postId, _id));
  };
  return (
    <div>
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img class="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">Posted on {formatDate(date)}</p>
          {!auth.loading && auth.user._id === user && (
            <button className="btn btn-danger" onClick={deleteCommentHandler} type="button">
              <i className="fa-solid fa-trash"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
