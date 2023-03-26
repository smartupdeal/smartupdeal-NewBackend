const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Profile Schema
const ProfileSchema = new Schema({
  name: {
    type: String
  },
  phone_no: {
    type: String
  },
  email: {
    type: String
  },
  business_name: {
    type: String
  },
  designation: {
    type: String
  },
  short_description: {
    type: String
  },
  location: {
    type: String
  },
  achievements: {
    type: String
  },
  interests: {
    type: String
  },
  experience: {
    type: String
  },
  education: {
    type: String
  },
  team: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Profile', ProfileSchema);
