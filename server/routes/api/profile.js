const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Profile = require('../../models/profile');

router.post('/addProfile', (req, res) => {
  const profile = new Profile(req.body);
  profile.save(async (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Profile created has been added successfully!`,
      event_type: data
    });
  });
});

module.exports = router;
