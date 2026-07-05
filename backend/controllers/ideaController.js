import Idea from "../models/Idea.js";
import Report from "../models/Report.js";
import { generateStartupReport } from "../services/aiService.js";

export const createIdea = async (req, res) => {
  let newIdea;

  try {
    const {
      title,
      idea,
      targetMarket,
      businessModel,
      industry,
      country,
      competitors,
      budget,
      teamSize,
      stage,
      timeline,
    } = req.body;

    if (!title || !idea || !targetMarket || !businessModel) {
      return res.status(400).json({
        message: "Title, idea, target market and business model are required",
      });
    }

    newIdea = await Idea.create({
      user: req.user._id,
      title,
      idea,
      targetMarket,
      businessModel,
      industry,
      country,
      competitors,
      budget,
      teamSize,
      stage,
      timeline,
      status: "processing",
    });

    const aiReport = await generateStartupReport({
      title,
      idea,
      targetMarket,
      businessModel,
      industry,
      country,
      competitors,
      budget,
      teamSize,
      stage,
      timeline,
    });

    const report = await Report.create({
      user: req.user._id,
      idea: newIdea._id,
      ...aiReport,
    });

    newIdea.status = "completed";
    await newIdea.save();

    res.status(201).json({
      message: "Startup idea validated successfully",
      idea: newIdea,
      report,
    });
  } catch (error) {
    console.error("Create idea error:", error.message);

    if (newIdea) {
      newIdea.status = "failed";
      await newIdea.save();
    }

    res.status(500).json({
      message: "Failed to validate startup idea",
    });
  }
};

export const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch ideas" });
  }
};

export const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch idea" });
  }
};
