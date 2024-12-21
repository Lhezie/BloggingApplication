const mongoose = require('mongoose');

// create Schema object
const Schema = mongoose.Schema;
const blogSchema = new Schema ({
   title:
   {
      type: String,
      required: true,
      unique: true
   },
   description: String,
   author: String,
   state:
   {
      type: String,
      enum:
         ['draft', 'published'],
      default: 'draft'
   },
   read_count:
   {
      type: Number,
      default: 0
   },
   reading_time: String,
   tags: [String],
   body:
   {
      type: String,
      required: true
   },
   createdAt:
   {
      type: Date,
      default: Date.now
   },
   updatedAt:{
      type: Date,
      default: Date.now
   },
}, { timestamps: true });


module.exports = mongoose.model('Blog', blogSchema);