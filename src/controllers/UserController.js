const userSchema = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailSend = require("../utils/MailUtil");

// REGISTER USER
const registerUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const existingUser = await userSchema.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await userSchema.create({...req.body,password: hashedPassword,});

    await mailSend(savedUser.email,"Welcome to our app",
      `<div style="font-family:Arial;padding:20px">
        <h2 style="color:#f97316;">Welcome to LocalGems</h2>
        <p>Hi ${savedUser.name},</p>
        <p>Thank you for registering on <b>LocalGems</b>.</p>
        <p style="margin-top:20px;color:gray;font-size:12px">© LocalGems</p>
      </div>`
    );

    res.status(201).json({
      message: "User created successfully",
      data: savedUser,
    });

  } catch (err) {

    res.status(500).json({
      message: "Error while creating user",
      err: err,
    });

  }
};

// LOGIN USER
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const foundUserFromMail = await userSchema.findOne({ email: email });

    if (!foundUserFromMail) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      foundUserFromMail.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    res.status(200).json({
      message: "Login Successfully",
      data: foundUserFromMail,
      role: foundUserFromMail.role,
    });

  } catch (err) {

    res.status(500).json({
      message: "Error while logging in",
      err: err,
    });

  }

};

// GET ALL USERS
const getAllUsers = async (req, res) => {

  try {

    const users = await userSchema.find();

    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });

  } catch (err) {

    res.status(500).json({
      message: "Error while fetching users",
      err: err,
    });

  }

};

// GET USER BY ID
const getUserById = async (req, res) => {

  try {

    const user = await userSchema.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });

  } catch (err) {

    res.status(500).json({
      message: "Error while fetching user",
      err: err,
    });

  }

};

// SOFT DELETE USER (INACTIVE)
const deleteUser = async (req, res) => {

  try {

    const user = await userSchema.findByIdAndUpdate(req.params.id,{ isActive: false },{ new: true });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deactivated successfully",
      data: user,
    });

  } catch (err) {

    res.status(500).json({
      message: "Error while deleting user",
      err: err,
    });

  }

};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser
};