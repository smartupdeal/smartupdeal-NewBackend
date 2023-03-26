const Mongoose = require("mongoose");

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: () => {
      return this.provider !== "email" ? false : true;
    },
  },
  phoneNumber: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: "Merchant",
    default: null,
  },
  provider: {
    type: String,
    required: true,
    default: "email",
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "ROLE_MEMBER",
    enum: ["ROLE_MEMBER", "ROLE_ADMIN", "ROLE_MERCHANT"],
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
    enum: ["M", "F", "N"],
  },
  dateOfBirth: {
    type: Date,
  },
  about:{
    type:String,
    maxlength:500
  },
  interests: {
    type: {
      skills: [{ type: Schema.Types.ObjectId, ref: "Skill", default: null }],
      industries: [
        { type: Schema.Types.ObjectId, ref: "Industry", default: null },
      ],
      technologies: [
        { type: Schema.Types.ObjectId, ref: "Technology", default: null },
      ],
    },
    default: {
      skills: [],
      industries: [],
      technologies: [],
    },
  },
  achievements: {
    type: [{ type: String }],
  },
  education: {
    type: [{ institution: String, program: String, passingYear: String }],
  },
  experience: {
    type: [
      {
        organization: String,
        designation: String,
        fromDate: Date,
        toDate: Date,
        isCurrent: Boolean
      },
    ],
  },
});

module.exports = Mongoose.model("User", UserSchema);
