const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Blog Schema
const BlogSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
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

module.exports = Mongoose.model('Blog', BlogSchema);
