const express = require("express");
const router = express.Router();
const middleWare = require("../../middlewares/index");
const controller = require("../../controllers/index");

// Route to get all blogs
router.get("/", controller.blogController.getBlogs);

// Route to add a blog
router.post(
  "/",
  middleWare.validationMiddleware.validateToken,
  middleWare.validationMiddleware.checkAuthorPermission,
  controller.blogController.createBlog
);

// Route to get a specific blog
router.get(
  "/:id",
  middleWare.blogMiddleWare.getBlog,
  controller.blogController.getBlogById
);
router.patch(
  "/like/:id",
  middleWare.blogMiddleWare.getBlog,
  controller.blogController.addLike
);
router.patch(
  "/view/:id",
  middleWare.blogMiddleWare.getBlog,
  controller.blogController.addView
);

// Route to update a specific blog
router.patch(
  "/:id",
  middleWare.validationMiddleware.validateToken,
  middleWare.validationMiddleware.checkAuthorPermission,
  middleWare.blogMiddleWare.getBlog,
  controller.blogController.updateBlog
);

// Route to delete a specific blog
router.delete(
  "/:id",
  middleWare.validationMiddleware.validateToken,
  middleWare.validationMiddleware.checkAuthorPermission,
  middleWare.blogMiddleWare.getBlog,
  controller.blogController.deletBlog
);

module.exports = router;
