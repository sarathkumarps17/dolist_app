const login = require("express").Router();
const auth = require("../auth/auth_middleware");

const { check, validationResult } = require("express-validator");

const User = require("../../db_models/User/User");
const jwt = require("jsonwebtoken");
const config = require("config");

const bcrypt = require("bcryptjs");

login.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
    return res.end();
  } catch (error) {
    res.status(404).json({ errors: [{ msg: error.message }] });
    return res.end();
  }
});

login.post(
  "/",
  [
    check("name", "Name can not be empty").not().isEmpty(),
    check("password", "Password can not be empty").not().isEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ errors: error.array() });
      return res.end();
    }
    try {
      let { name, password } = req.body;
      let user = await User.findOne({ name });
      if (!user) {
        res.status(400).json({ errors: [{ msg: "Inavlid credentials" }] });
        return res.end();
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: "Inavlid credentials" }] });
        return res.end();
      }
      const payload = {
        id: user.id,
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          else {
            res.status(200).json({ token });
            return res.end();
          }
        }
      );
    } catch (error) {
      res.status(500).json({ errors: [{ msg: error.message }] });
      return res.end();
    }
  }
);
module.exports = login;
