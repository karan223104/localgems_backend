const talentProviderSchema = require("../models/TalentProviderModel");
const userSchema = require("../models/UserModel");

// Create Talent Provider Profile
const createProvider = async (req, res) => {

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
    if (user.role !== "talentprovider") {
      return res.status(400).json({
        message: "Only talentprovider users can create provider profile"
      });
    }

    // check profile already exist
    const existingProvider = await talentProviderSchema.findOne({ userId });

    if (existingProvider) {
      return res.status(409).json({
        message: "Provider profile already exists"
      });
    }

    const provider = await talentProviderSchema.create(req.body);

    res.status(201).json({
      message: "Provider profile created successfully",
      data: provider
    });

  } catch (err) {

    res.status(500).json({
      message: "Error creating provider profile",
      err: err
    });

  }

};

// Get All Providers
const getAllProviders = async (req, res) => {

  try {

    const providers = await talentProviderSchema.find().populate("userId", "name email");

    res.status(200).json({
      message: "All providers fetched",
      totalProviders: providers.length,
      data: providers
    });

  } catch (err) {

    res.status(500).json({
      message: "Error fetching providers",
      err: err
    });

  }

};

// Get Provider By ID
const getProviderById = async (req, res) => {

  try {

    const provider = await talentProviderSchema.findById(req.params.id).populate("userId", "name email");

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found"
      });
    }

    res.status(200).json({
      message: "Provider fetched successfully",
      data: provider
    });

  } catch (err) {

    res.status(500).json({
      message: "Error fetching provider",
      err: err
    });

  }

};

// Update Provider Profile
const updateProvider = async (req, res) => {

  try {

    const updatedProvider = await talentProviderSchema.findByIdAndUpdate(req.params.id,req.body,{ new: true });

    if (!updatedProvider) {
      return res.status(404).json({
        message: "Provider not found"
      });
    }

    res.status(200).json({
      message: "Provider profile updated successfully",
      data: updatedProvider
    });

  } catch (err) {

    res.status(500).json({
      message: "Error updating provider profile",
      err: err
    });

  }

};



// Soft Delete Provider
const deleteProvider = async (req, res) => {

  try {

    const deletedProvider = await talentProviderSchema.findByIdAndUpdate(req.params.id,
    { new: true });

    if (!deletedProvider) {
      return res.status(404).json({
        message: "Provider not found"
      });
    }

    res.status(200).json({
      message: "Provider profile deleted successfully",
      data: deletedProvider
    });

  } catch (err) {

    res.status(500).json({
      message: "Error deleting provider",
      err: err
    });

  }

};

module.exports = {
  createProvider,
  getAllProviders,
  getProviderById,
  updateProvider,
  deleteProvider
};