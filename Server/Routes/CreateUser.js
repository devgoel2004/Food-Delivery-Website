const express = require("express");

const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require(`bcryptjs`);
const jwtSecret = "myNameIsDevGoel9690011021";

router.post(
  "/createUser",
  [
    body(`email`).isEmail(),
    body(`name`).isLength({ min: 4 }),
    body(`password`).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let setPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: setPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);
router.post(
  `/login`,
  [
    body(`email`).isEmail(),
    body(`password`, `Incorrect Password`).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: `Try Logging with correct credentials` });
      }

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (pwdCompare) {
        console.log(req.body.password);
        console.log(userData.password);
        return res
          .status(400)
          .json({ errors: `try logging with correct credentials`, pwdCompare });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);
module.exports = router;
