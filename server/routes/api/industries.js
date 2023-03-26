const express = require("express");
const router = express.Router();

// Bring in Models & Helpers
const Industry = require("../../models/industries");
const auth = require("../../middleware/auth");

// fetch industries api
router.get("/", auth, async (req, res) => {
  try {
    const industries = await Industry.find({}, "_id name");

    res.status(200).json({
      industries,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

module.exports = router;
