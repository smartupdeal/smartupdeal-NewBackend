const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Event Schema
const EventSchema = new Schema({
  eventType: {
    type: Schema.Types.ObjectId,
    ref: 'EventType',
    default: null
  },
  eventSegment: {
    type: Schema.Types.ObjectId,
    ref: 'Segment',
    default: null
  },
  isOnlineEvent: {
    type: Number
  },
  eventLocation: {
    type: String
  },
  eventBanner: {
    type: String
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  registrationDeadline: {
    type: Date
  },
  featuredListing: {
    type: Number
  },
  venueName: {
    type: String
  },
  zipcode: {
    type: Number
  },
  registrationURL: {
    type: String
  },
  startDate: Date,
  endDate: Date,
  listingExpiryDate: Date,
  organizerDetails: {
    type: Schema.Types.ObjectId,
    ref: 'Organizer',
    default: null
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

module.exports = Mongoose.model('Event', EventSchema);
