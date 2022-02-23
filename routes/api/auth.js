const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_TOKEN_SECRET;
const { check, validationResult } = require("express-validator");

//* get a user

router.get("/", auth, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id).select("-password");
    return res.json(userData);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

//* login a user

router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password ( > 6 characters )").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let loginUser = await User.findOne({ email });

      if (!loginUser) {
        return res.status(400).json({ errors: [{ msg: "Email or password is incorrect" }] });
      }

      const isValidUser = await bcrypt.compare(password, loginUser.password);

      if (!isValidUser) {
        return res.status(400).json({ errors: [{ msg: "Email or password is incorrect" }] });
      }

      const payload = {
        user: {
          id: loginUser.id,
        },
      };

      jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        return res.json({ token });
      });
    } catch (e) {
      console.error(e.message);
      return res.status(500).json("Server Error");
    }
  }
);

module.exports = router;
