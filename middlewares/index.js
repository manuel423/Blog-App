const blogMiddleWare = require("./middleware/getBlogByIdMiddleWare");
const validationMiddleware = require("./middleware/validation");

module.exports = {
  blogMiddleWare,
  validationMiddleware,
};
