const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Organizer Schema
const OrganizerSchema = new Schema({
  email: {
    type: String
  },
  twitter: {
    type: String
  },
  facebook: {
    type: String
  },
  website: {
    type: String
  },
  youtube: {
    type: String
  },
  postedBy: {
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

module.exports = Mongoose.model('Organizer', OrganizerSchema);
