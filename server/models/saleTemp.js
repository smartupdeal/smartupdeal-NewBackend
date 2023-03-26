const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

Mongoose.plugin(slug, options);

// saleTemp Schema
const SaleTempSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  industry:[
    {
      type: Schema.Types.ObjectId,
     ref: 'Industry'
    }
  ],
  skill: [{
    type: Schema.Types.ObjectId,
    ref: 'Skill'
  }],
  technology: [{
    type: Schema.Types.ObjectId,
    ref: 'Technology'
  }],
  slug: {
    type: String,
    slug: 'name',
    unique: true
  },
  imageUrls: {
    type: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  packages: [
    {
      packTitle: String,
      description: String,
      highLight:String,
      optionalProducts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        }
      ],
      optionalProductsDefaultQuantity: [{  id: String, value: Number }],
      noneOptionalProducts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        }
      ],
      noneOptionalProductsDefaultQuantity: [{  id: String, value: Number }],

    }
  ],
  highLights: [{ text: String }],
  faqs: [{  Q: String, A: String }],
  connectSlot: {
    price: Number,
    duration: Number,
    speakers:[
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    frequency: String,
    noOfSessions:Number,
    sessions:[{
      date: Date,
      start: Date,
      end: Date,
      weekDays:[String],
    }]
  },

  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('SaleTemp', SaleTempSchema);
