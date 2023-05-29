const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "../.env" });
const userLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("User does not exist.");
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken({
        userName: user.userName,
        id: user._id,
      });
      const refreshToken = jwt.sign(
        { userName: user.userName, id: user._id },
        process.env.JWT_SECRET_REFRESH_TOKEN,
        { expiresIn: "1h" }
      );
      res.json({
        result: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.send("Invalid credentials.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userRegister = async (req, res) => {
  const {
    userType,
    firstName,
    lastName,
    userName,
    email,
    password,
    confirmedPassword,
  } = req.body;

  const isEmailExist = await User.findOne({ email });
  const isUserNameExist = await User.findOne({ userName });

  if (isUserNameExist || isEmailExist)
    return res.status(400).json({ message: "User already exists." });
  if (password !== confirmedPassword)
    return res.status(400).json({ message: "Passwords don't match" });

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    firstName,
    lastName,
    userType,
    userName,
    email,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();
    const accessToken = generateAccessToken({
      userName: user.userName,
      id: user._id,
    });
    const refreshToken = jwt.sign(
      { userName: user.userName, id: user._id },
      process.env.JWT_SECRET_REFRESH_TOKEN,
      { expiresIn: "2h" }
    );
    res.status(201).json({
      result: newUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const generateAccessToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET_ACCESS_TOKEN, {
    expiresIn: "25m",
  });
};

module.exports = { userLogin, userRegister };
