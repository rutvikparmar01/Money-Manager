const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit OTP
};

const router = express.Router();
const JWT_SECRET = "itsimywebtokensecret$@#$";

//! Route 1 : POST "/api/auth/createuser" no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let succesc=false;
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });

      const Data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(Data, JWT_SECRET);
 succesc=true;
      res.json({succesc, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

//!router 2: api/auth/login  login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let succesc=false;
    try {
      
      let user = await User.findOne({ email });
      if (!user) {
        succesc=false;
        return res.status(400).json({ error: "enter valid input" });
      }
      const passwordcomapir = await bcrypt.compare(password, user.password);
      if (passwordcomapir) {
        const Data = {
          user: {
            id: user.id,
          },
        };
        succesc=true;
        const token = jwt.sign( Data, JWT_SECRET);

        res.json({succesc, token });
      } else {
        succesc=false;
        res.status(400).json({ error: "enter valid input" });
      }
    } catch (error) {
      res.json(error.message);
    }
  }
);

//! ROUTER 3: /api/auth/getuser login is required

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({ user});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});




module.exports=router;