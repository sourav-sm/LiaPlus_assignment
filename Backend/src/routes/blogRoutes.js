const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizedRoles = require("../middleware/roleMiddleware");
const Blog = require("../models/postModel");

const router = express.Router();

// Admin can create a new blog post
router.post("/", verifyToken, authorizedRoles("admin"), async (req, res) => {
    const { title, content } = req.body;

    console.log("Request user:", req.user); // Debug log to check req.user

    try {
        const blog = new Blog({
            title,
            content,
            author: req.user.username, // Ensure this is set correctly
        });
        await blog.save();
        res.status(201).json({ message: "Blog created successfully.", blog });
    } catch (error) {
        console.error("Error creating blog:", error); // Debug log
        res.status(500).json({ message: "Error creating blog.", error: error.message });
    }
});


// All authenticated users can view all blog posts
router.get("/", verifyToken, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs.", error: error.message });
  }
});

// All authenticated users can view a single blog post by ID
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog.", error: error.message });
  }
});

// Admin can update a blog post
router.put("/:id", verifyToken, authorizedRoles("admin"), async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    await blog.save();
    res.status(200).json({ message: "Blog updated successfully.", blog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog.", error: error.message });
  }
});

// Admin can delete a blog post
router.delete("/:id", verifyToken, authorizedRoles("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog.", error: error.message });
  }
});

module.exports = router;
