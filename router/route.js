const express = require("express");
const router = express.Router();
const authorContoller = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const middleware = require("../middleware/auth");

router.post("/authors", authorContoller.createAuthor);

router.get("/getblog", middleware.Authentication,blogController.getBlogs);

//////////////////// -MIDDLEWARE WITH AUTHENTICATION AND AUTHERIZATION- ////////////////

router.put("/updateBlogs/:blogId",middleware.Authentication,middleware.Authorization,blogController.updateBlogs);

router.delete("/deleteBlogs/:blogId",middleware.Authentication, middleware.Authorization,blogController.deleteBlogs);

router.delete("/deleteByQuery",middleware.Authentication, blogController.deleteByQuery);

router.post("/authorLogin", authorContoller.authorLogIn);

router.post("/blogs",middleware.Authentication, middleware.Authorization,blogController.createBlog);

module.exports = router;
