const express = require("express");
const { getAllPosts } = require("../db");
const postsRouter = express.Router();

postsRouter.get("/", async (req, res) => {
  const posts = await getAllPosts();

  res.send({
    posts,
  });
  return posts;
});

module.exports = postsRouter;
