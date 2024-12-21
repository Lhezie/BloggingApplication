const Blog = require('../server/models/blog');
const calculateReadingTime = require('../Utils/calculatingReadingTime');

exports.createBlog = async (req, res) => {
   try {
       const { title, description, tags, body } = req.body;
       const reading_time = calculateReadingTime(body);
       const blog = new Blog({
           title,
           description,
           author: "640caa0659f9b26e509a2d88", // Replace with a valid author ID
           tags,
           body,
           reading_time,
       });
       await blog.save();
       res.status(201).json(blog);
   } catch (error) {
       res.status(400).json({ error: error.message });
   }
};
