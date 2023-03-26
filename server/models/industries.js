const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Industry Schema
const IndustrySchema = new Schema({
  name: {
    type: String,
    trim: true
  },
});

module.exports = Mongoose.model('Industry', IndustrySchema,'industries');
