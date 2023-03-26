const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Skill Schema
const TechnologySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
  },
  { collection: "technologies" }
);

module.exports = Mongoose.model("Technology", TechnologySchema);
