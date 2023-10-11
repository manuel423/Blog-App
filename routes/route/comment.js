const express = require("express");
const router = express.Router();
const middleWare = require("../../middlewares/index");
const controller = require("../../controllers/index");

// Route to get all comments
router.get(
  "/:id",
  middleWare.blogMiddleWare.getBlog,
  controller.commentsController.getComment
);

// Route to add a comment
router.post(
  "/:id",
  middleWare.validationMiddleware.validateToken,
  middleWare.validationMiddleware.checkUserPermission,
  middleWare.blogMiddleWare.getBlog,
  controller.commentsController.createComment
);

// Route to update a specific comment
// router.patch(
//   "/:id",
//   middleWare.validationMiddleware.validateToken,
//   middleWare.validationMiddleware.checkUserPermission,
//   middleWare.blogMiddleWare.getBlog,
//   controller.commentsController.updateBlog
// );

// // Route to delete a specific comment
// router.delete(
//   "/:id",
//   middleWare.validationMiddleware.validateToken,
//   middleWare.validationMiddleware.checkAuthorPermission,
//   middleWare.blogMiddleWare.getBlog,
//   controller.commentsController.deletBlog
// );

module.exports = router;
