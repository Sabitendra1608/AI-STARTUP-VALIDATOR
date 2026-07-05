import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    idea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea",
      required: true,
    },

    executiveSummary: String,
    problemValidation: String,
    customerPersona: String,
    marketAnalysis: String,
    competitorAnalysis: String,
    swotAnalysis: {
      strengths: [String],
      weaknesses: [String],
      opportunities: [String],
      threats: [String],
    },
    monetizationReview: String,
    mvpRoadmap: [String],
    goToMarketStrategy: [String],
    riskAnalysis: [String],
    techStackSuggestion: [String],
    aiUsageSuggestions: [String],
    uniqueAngle: String,
    investorReadiness: String,
    finalVerdict: String,

    score: {
      problemSeverity: Number,
      marketPotential: Number,
      competitionGap: Number,
      monetization: Number,
      feasibility: Number,
      aiAdvantage: Number,
      investorReadiness: Number,
      total: Number,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;