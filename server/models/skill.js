const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Skill Schema
const SkillSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
  },
  { collection: "skills" }
);

module.exports = Mongoose.model("Skill", SkillSchema);
