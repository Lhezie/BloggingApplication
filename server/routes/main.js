const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

// Routes
// home route
router.get('', async (req, res) => {
    try {
      const locals = {
        title: "NodeJs Blog",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      let perPage = 2;
      let page = req.query.page || 1;
  
        const blogs = await Blog.aggregate([{ $sort:  { createdAt: -1 } } ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
  
      // Count is deprecated - please use countDocuments
      // const count = await Blog.count();
      const count = await Blog.countDocuments({});
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);
  
      res.render('index', { 
        locals,
        blogs,
        current: page,
        nextPage: hasNextPage ? nextPage : null,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });


// add data into my database
// function insertBlogDate() {
//   Blog.insertMany([
//     {
//       title: "Public Blog Page1",
//       description: "Blog page created with Nodejs, Express",
//       author: "640caa0659f9b26e509a2d88",
//       tags: ["public", "private", "#personality"],
//       body: " This is the body text",
//       state: "published",
//       read_count: 0,
//       reading_time: "3 minutes",
//     },

//     {
//       title: "Public Blog Page2",
//       description: "Blog page created with Nodejs, Express",
//       author: "640caa0659f9b26e509a2d88",
//       tags: ["public", "private", "#personality"],
//       body: " This is the body text",
//       state: "published",
//       read_count: 0,
//       reading_time: "3 minutes",
//     },

//     {
//       title: "Public Blog Page3",
//       description: "Blog page created with Nodejs, Express",
//       author: "640caa0659f9b26e509a2d88",
//       tags: ["public", "private", "#personality"],
//       body: " This is the body text",
//       state: "published",
//       read_count: 0,
//       reading_time: "3 minutes",
//     },

//     {
//       title: "Public Blog Page4",
//       description: "Blog page created with Nodejs, Express",
//       author: "640caa0659f9b26e509a2d88",
//       tags: ["public", "private", "#personality"],
//       body: " This is the body text",
//       state: "published",
//       read_count: 0,
//       reading_time: "3 minutes",
//     },
//   ]);
// }

// insertBlogDate();


// find all blog blogs
// try {
//     const blogs = await Blog.find({ state: "published" }).sort({ createdAt: -1 });
//     res.render("index", { locals, blogs });
// } catch (error) {
//     console.log(error);
// }

// about route

/**
 * GET /
 * blog :id
*/
router.get('/blog/:id', async (req, res) => {
    try {
      let slug = req.params.id;
  
      const blog = await Blog.findById({ _id: slug });
  
      const locals = {
        title: blog.title,
        description: "Simple Blog created with NodeJs, Express & MongoDb.",
      }
  
      res.render('blog', { 
        locals,
        blog,
        currentRoute: `/blog/${slug}`
      });
    } catch (error) {
      console.log(error);
    }
  
  });

  
  /**
 * POST /
 * Blog - searchTerm
*/
router.post('/search', async (req, res) => {
    try {
      const locals = {
        title: "Seach",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
  
      const blog = await Blog.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
          { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
        ]
      });
  
      res.render("search", {
        blog,
        locals,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });
  


router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
