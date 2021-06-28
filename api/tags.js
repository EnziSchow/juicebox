const express = require("express");
const { getAllTags, getPostsByTagName } = require("../db");
const tagsRouter = express.Router();

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;
  try {
    const allTags = await getPostsByTagName(tagName);

    const posts = allTags.filter((post) => {
      return post.active || (req.user && post.author.id === req.user.id);
    });

    if (posts) {
      res.send({ posts });
    }
    next();
  } catch ({ name, message }) {
    next({ name, message });
  }
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
  return tags;
});

module.exports = tagsRouter;
