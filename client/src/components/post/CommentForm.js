import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../actions/postActions";

const CommentForm = (props) => {
  const [text, setText] = useState();
  const { postId } = props;
  const dispatch = useDispatch();
  const textChangeHandler = (e) => {
    setText(e.target.value);
  };

  const commentFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addComment(postId, { text }));
    setText("");
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Add a comment...</h3>
      </div>
      <form className="form my-1" onSubmit={commentFormSubmitHandler}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
          onChange={textChangeHandler}
          value={text}></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
