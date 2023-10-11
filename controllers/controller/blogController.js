const Blog = require("../../models/blog");
const getuser = require("../../middlewares/middleware/validation").getUser;

module.exports = {
  getBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      return res.status(201).json(blogs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getBlogById: async (req, res) => {
    const blog = Blog.findOne(req.params.blog);
    return res.status(201).json(res.blog);
  },

  createBlog: async (req, res) => {
    const data = req.body;
    const user = getuser(req).user;
    console.log(user._id);

    const blog = new Blog({
      title: data.title,
      content: data.content,
      author: user._id,
    });

    try {
      const newBlog = await blog.save();
      return res.status(201).json(newBlog);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },

  addLike: async (req, res) => {
    let blog = res.blog;
    blog.like += 1;
    try {
      const updatedBlog = await res.blog.save();
      return res.status(201).json(updatedBlog);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
  addView: async (req, res) => {
    let blog = res.blog;
    blog.view += 1;
    try {
      const updatedBlog = await res.blog.save();
      return res.status(201).json(updatedBlog);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
  updateBlog: async (req, res) => {
    if (req.body.title != null) {
      res.blog.title = req.body.title;
    }
    if (req.body.content != null) {
      res.blog.content = req.body.content;
    }

    try {
      const updatedBlog = await res.blog.save();
      return res.status(201).json(updatedBlog);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },

  deletBlog: async (req, res) => {
    try {
      await Blog.deleteOne(res.blog._id);
      return res.status(201).json({ message: "Blog has been deleted" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
