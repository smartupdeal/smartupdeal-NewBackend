const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Event Type Schema
const EventTypesSchema = new Schema({
  typeName: {
    type: String
  },
  isMostlyUsed: {
    type: Number
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

module.exports = Mongoose.model('EventType', EventTypesSchema);
