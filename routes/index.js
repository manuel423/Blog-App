const express = require("express");
const router = express.Router();

const user_routes = require("./route/user");
const blog_routes = require("./route/blog");
const comment_routes = require("./route/comment");

router.use("/user", user_routes);
router.use("/blog", blog_routes);
router.use("/comment", comment_routes);

module.exports = router;
