const userSchema = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailSend = require("../utils/MailUtil");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if user already exist
    const existingUser = await userSchema.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // encrypted password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // registerd user
    const savedUser = await userSchema.create({...req.body,password: hashedPassword,});

    // send mail after user registerd
    await mailSend(
      savedUser.email,
      "Welcome to our app",
      `<div style="font-family:Arial;padding:20px">
    
        <h2 style="color:#f97316;">Welcome to LocalGems </h2>

        <p>Hi ${savedUser.name},</p>

        <p>
            Thank you for registering on <b>LocalGems</b>.
            Now you can discover amazing talents around you.
        </p>

        <p style="margin-top:20px;color:gray;font-size:12px">
            © LocalGems
        </p>

    </div>
    `,
    ); // we can use here simple text here

    res.status(201).json({
      message: "user created successfully",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while creating user",
      err: err,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // found user by mail   
    const foundUserFromMail = await userSchema.findOne({ email: email });

    if (foundUserFromMail) {
      const isPasswordMatched = await bcrypt.compare(password,foundUserFromMail.password,);

      if (isPasswordMatched) {
        res.status(200).json({
          message: "Login Successfully",
          data: foundUserFromMail,
          role: foundUserFromMail.role,
        });
      } else {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error while logging in",
      err: err,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
