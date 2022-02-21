const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const { default: axios } = require("axios");

//* get profile of currently logged in user

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", [
      "name",
      "avatar",
    ]);
    if (!profile) {
      return res.status(400).json({ msg: "No profile for this user found" });
    }
    return res.json(profile);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

//* set profile of user

router.post(
  "/",
  auth,
  [
    check("status", "status is required").notEmpty(),
    check("skills", "skills is required").notEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    const profileData = {};

    profileData.user = req.user.id;

    if (company) profileData.company = company;
    if (website) profileData.website = website;
    if (location) profileData.location = location;
    if (bio) profileData.bio = bio;
    if (status) profileData.status = status;
    if (githubusername) profileData.githubusername = githubusername;
    if (skills) {
      profileData.skills = skills.split(",").map((skill) => skill.trim());
    }

    profileData.social = {};
    if (youtube) profileData.social.youtube = youtube;
    if (instagram) profileData.social.instagram = instagram;
    if (linkedin) profileData.social.linkedin = linkedin;
    if (facebook) profileData.social.facebook = facebook;
    if (twitter) profileData.social.twitter = twitter;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        //* Create new Profile

        profile = new Profile(profileData);
        await profile.save();
        return res.json(profile);
      } else {
        //* Update existing Profile

        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileData },
          { new: true }
        );
        return res.json(profile);
      }
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ msg: "Server Status" });
    }
  }
);

//* get all profiles

router.get("/", async (req, res) => {
  try {
    const allProfiles = await Profile.find({}).populate("user", ["name", "avatar"]);
    return res.json(allProfiles);
  } catch (e) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

//* get a single user profile

router.get("/user/:userId", async (req, res) => {
  try {
    const profile = await Profile.find({ user: req.params.userId }).populate("user", [
      "name",
      "avatar",
    ]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.json(profile);
  } catch (e) {
    if (e.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    console.log(e);
    return res.status(500).json({ msg: "Server Error" });
  }
});

//* delete profile, user, posts

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    return res.json({ msg: "Deleted Successfully" });
  } catch (e) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

//* add past experience

router.put(
  "/experience",
  auth,
  [
    check("title", "title is required").notEmpty(),
    check("company", "company is required").notEmpty(),
    check("from", "company is required").notEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { title, company, location, from, to, current, description } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      return res.json(profile);
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

//* delete past experience

router.delete("/experience/:expId", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience = profile.experience.filter(
      (exp) => exp._id.toString() !== req.params.expId
    );
    await profile.save();
    return res.json(profile);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

//* add past educations

router.put(
  "/education",
  auth,
  [
    check("school", "School is required").notEmpty(),
    check("degree", "Degree is required").notEmpty(),
    check("fieldofstudy", "field of study is required").notEmpty(),
    check("from", "company is required").notEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();
      return res.json(profile);
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

//* delete past educations

router.delete("/education/:eduId", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education = profile.education.filter((exp) => exp._id.toString() !== req.params.eduId);
    await profile.save();
    return res.json(profile);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

//* getting 5 most recent github projects of users

router.get("/github/:username", async (req, res) => {
  try {
    const url = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    };

    const response = await axios.get(url, { headers });
    return res.json(response.data);
  } catch (e) {
    console.error(e.message);
    return res.status(404).json({ msg: "No Github profile found" });
  }
});

module.exports = router;
