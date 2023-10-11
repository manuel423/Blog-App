const Comment = require("../../models/comment");
const getuser = require("../../middlewares/middleware/validation").getUser;

module.exports = {
  createComment: async (req, res) => {
    try {
      const data = req.body;
      const user = getuser(req).user;

      const comment = new Comment({
        comment: data.comment,
        blog: res.blog._id,
        user: user._id,
      });
      await comment.save();
      res.status(201).send(comment);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  getComment: async (req, res) => {
    try {
      console.log(res.blog._id);
      const comments = await Comment.aggregate([
        {
          $match: {
            blog: res.blog._id,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $lookup: {
            from: "blogs",
            localField: "blog",
            foreignField: "_id",
            as: "blogInfo",
          },
        },
      ]);
      console.log(comments);
      return res.status(201).json(comments);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
