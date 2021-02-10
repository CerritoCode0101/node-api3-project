const usrModel = require("../users/users-model");

const logger = (req, res, next) => {
  console.log(
    ` On [${new Date().toISOString()}] a new ${
      req.method
    } request was made to ${req.url}`
  );
  next();
};

const validateUserId = (req, res, next) => {
  const { id } = req.params;
  usrModel
    .getById(id)
    .then((user) => {
      if (!user) {
        res
          .status(400)
          .json({ message: `No user with the id: ${id} was found.` });
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      console.log("Server Error", err);
      res.status(500).json({ message: "Server Error" });
    });
};

const validateUser = (req, res, next) => {
  const user = req.body.name;
  if (user) {
    next();
  } else {
    res.status(400).json({ message: "Name is required" });
  }
};

const validatePost = (req, res, next) => {
  const text = req.body.text;
  const userID = req.body.user_id;
  if (text && userID) {
    next();
  } else if (req.body == null) {
    res.status(400).json({ message: "Post data missing" });
  } else {
    res.status(400).json({ message: "Post text not found" });
  }
};

// do not forget to expose these functions to other modules

module.exports = {
  validatePost,
  validateUser,
  validateUserId,
  logger,
};
