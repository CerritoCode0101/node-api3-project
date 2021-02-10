const express = require("express");
const pstModel = require("./posts-model");
const router = express.Router();
const mw = require("../middleware/middleware");

router.get("/", (req, res) => {
  pstModel
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(404).json({ message: "The posts were not found" });
    });
});

router.get("/:id", mw.validateUserId, (req, res) => {
  const idVar = req.params.id;
  pstModel
    .getById(idVar)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(() => res.status(404).json({ message: "The post was not found" }));
  // RETURN THE POST OBJECT
  // this needs a middleware to verify post id
});

// do not forget to export the router

module.exports = router;
