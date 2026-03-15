const talentSchema = require("../models/TalentModel");
const userSchema = require("../models/UserModel");

// Create Talent Profile
const createTalent = async (req, res) => {

  try {

    const { userId } = req.body;

    // check user exist
    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // check role
    if (user.role !== "talent") {
      return res.status(400).json({
        message: "Only talent users can create talent profile"
      });
    }

    // check profile already exist
    const existingTalent = await talentSchema.findOne({ userId });

    if (existingTalent) {
      return res.status(409).json({
        message: "Talent profile already exists"
      });
    }

    const talent = await talentSchema.create(req.body);

    res.status(201).json({
      message: "Talent profile created successfully",
      data: talent
    });

  } catch (err) {

    res.status(500).json({
      message: "Error creating talent profile",
      err: err
    });

  }

};

// Get All Talents
const getAllTalents = async (req, res) => {

  try {

    const talents = await talentSchema.find({ isActive: true }).populate("userId", "name email");

    res.status(200).json({
      message: "All talents fetched",
      totalTalents: talents.length,
      data: talents
    });

  } catch (err) {

    res.status(500).json({
      message: "Error fetching talents",
      err: err
    });

  }

};

// Get Talent By ID
const getTalentById = async (req, res) => {

  try {

    const talent = await talentSchema.findById(req.params.id).populate("userId", "name email");

    if (!talent) {
      return res.status(404).json({
        message: "Talent not found"
      });
    }

    res.status(200).json({
      message: "Talent fetched successfully",
      data: talent
    });

  } catch (err) {

    res.status(500).json({
      message: "Error fetching talent",
      err: err
    });

  }

};

// Update Talent Profile
const updateTalent = async (req, res) => {

  try {

    const updatedTalent = await talentSchema.findByIdAndUpdate(req.params.id,req.body,{ new: true });

    if (!updatedTalent) {
      return res.status(404).json({
        message: "Talent not found"
      });
    }

    res.status(200).json({
      message: "Talent profile updated successfully",
      data: updatedTalent
    });

  } catch (err) {

    res.status(500).json({
      message: "Error updating talent profile",
      err: err
    });

  }

};

// Soft Delete Talent
const deleteTalent = async (req, res) => {

  try {

    const deletedTalent = await talentSchema.findByIdAndUpdate(req.params.id,{ isActive: false },{ new: true });

    if (!deletedTalent) {
      return res.status(404).json({
        message: "Talent not found"
      });
    }

    res.status(200).json({
      message: "Talent profile deactivated successfully",
      data: deletedTalent
    });

  } catch (err) {

    res.status(500).json({
      message: "Error deleting talent",
      err: err
    });

  }

};

module.exports = {
  createTalent,
  getAllTalents,
  getTalentById,
  updateTalent,
  deleteTalent
};