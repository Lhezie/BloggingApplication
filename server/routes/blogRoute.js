const express = require('express');
const router = express.Router();
const {
   createBlog,
   getPublishedBlogs,
   getSingleBlog,
   updateBlogState,
   updateBlog,
   deleteBlog,
   getUserBlogs
} = require('../../controllers/blogController');
// const authMiddleware = require('../middlewares/authMiddleware');



router.post("/create", createBlog);
// console.log("createBlog is this", createBlog);

module.exports = router;
