const express = require("express");
const router = express.Router();

// Bring in Models & Helpers
const Skill = require("../../models/skill");
const auth = require("../../middleware/auth");

// fetch skills api
router.get("/", auth, async (req, res) => {
  try {
    const skills = await Skill.find({}, "_id name");

    res.status(200).json({
      skills,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

module.exports = router;
