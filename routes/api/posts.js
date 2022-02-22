const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { auth } = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Posts");

//* add a new post

router.post("/", auth, check("text", "text is required").notEmpty(), async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    await newPost.save();

    res.json(newPost);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: "server Error" });
  }
});

//* get all posts

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: "server Error" });
  }
});

//* find a single post by id

router.get("/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (e) {
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.log(e.message);
    res.status(500).json({ msg: "server Error" });
  }
});

//* delete a post

router.delete("/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await post.remove();
    return res.json({ msg: "Post removed" });
  } catch (e) {
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.log(e.message);
    res.status(500).json({ msg: "server Error" });
  }
});

//* liking a post

router.patch("/like/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const userLiked = post.likes.find((post) => post.user.toString() === req.user.id);
    if (userLiked) {
      return res.status(401).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (e) {
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.log(e.message);
    res.status(500).json({ msg: "server Error" });
  }
});

//* unlike a post

router.patch("/unlike/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const userLiked = post.likes.find((post) => post.user.toString() === req.user.id);
    if (!userLiked) {
      return res.status(401).json({ msg: "Post has not been liked" });
    }
    post.likes = post.likes.filter((like) => like.user.toString() !== req.user.id);

    await post.save();

    return res.json(post.likes);
  } catch (e) {
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.log(e.message);
    res.status(500).json({ msg: "server Error" });
  }
});

//* Add a new Comment

router.patch(
  "/:postId/comment",
  auth,
  check("text", "text is required").notEmpty(),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.postId);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ msg: "server Error" });
    }
  }
);

//* delete a comment

router.delete("/:postId/comment/:commentId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    const comment = post.comments.find((comment) => comment.id.toString() === req.params.commentId);
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter(
      (comment) => comment.id.toString() !== req.params.commentId
    );

    await post.save();

    return res.json(post.comments);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: "server Error" });
  }
});

module.exports = router;
