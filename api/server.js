const express = require("express");
const mw = require("./middleware/middleware");
const server = express();
const usrRouter = require("./users/users-router");
const pstRouter = require("./posts/posts-router");
// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and routes need to be connected here
server.use(mw.logger);
server.use("/api/users", usrRouter);
server.use("/api/posts", pstRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
