import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    idea: {
      type: String,
      required: true,
    },

    targetMarket: {
      type: String,
      required: true,
    },

    businessModel: {
      type: String,
      required: true,
    },

    industry: {
      type: String,
      default: "Not specified",
    },

    country: {
      type: String,
      default: "Not specified",
    },

    competitors: {
      type: String,
      default: "Not specified",
    },

    budget: {
      type: String,
      default: "Not specified",
    },

    teamSize: {
      type: String,
      default: "Not specified",
    },

    stage: {
      type: String,
      default: "Not specified",
    },

    timeline: {
      type: String,
      default: "Not specified",
    },

    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },
  },
  { timestamps: true }
);

const Idea = mongoose.model("Idea", ideaSchema);

export default Idea;