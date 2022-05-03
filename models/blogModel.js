const mongoose = require("mongoose");
let objectId = mongoose.Schema.Types.ObjectId;


////////////////////// -BLOG SCHEMA- /////////////////


const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    authorId: {
      type: objectId,
      required: true,
      ref: "Project_authors",
    },
    tags: [String],
    
    category: {
      type: [String],
      required: true,
    },
    subcategory: [String],
    deletedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project_blogs", blogSchema);
