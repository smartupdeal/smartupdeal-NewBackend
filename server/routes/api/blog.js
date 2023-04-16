const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Blog = require('../../models/blog');

router.post('/addBlog', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: 'You must enter an Title & description!' });
  }

  const blog = new Blog(req.body);

  blog.save(async (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Blog has been added successfully!`,
      event_type: data
    });
  });
});

router.get('/blogList', async (req, res) => {
  console.log("//======================== blogList ======================//");
  try {
    const blogs = await Blog.find({
      isActive: true
    });

    res.status(200).json({
      blogs
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;
