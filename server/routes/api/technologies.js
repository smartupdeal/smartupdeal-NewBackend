const express = require("express");
const router = express.Router();

// Bring in Models & Helpers
const Technology = require("../../models/technology");
const auth = require("../../middleware/auth");

// fetch technologies api
router.get("/", auth, async (req, res) => {
  try {
    const technologies = await Technology.find({}, "_id name");

    res.status(200).json({
      technologies,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

module.exports = router;
