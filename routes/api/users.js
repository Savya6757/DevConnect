if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_TOKEN_SECRET;

router.post(
  "/",
  [
    check("name", "Name is required").trim().notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password ( > 6 characters )").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password } = req.body;
    try {
      let newUser = await User.findOne({ email });

      if (newUser) {
        return res.status(400).json({ error: [{ msg: "Email already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      newUser = await new User({ name, email, password, avatar });

      const salt = await bcrypt.genSalt(10);

      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      const payload = {
        user: {
          id: newUser.id,
        },
      };

      jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (e) {
      console.error(e.message);
      res.status(500).json("Server Error");
    }
  }
);

module.exports = router;
