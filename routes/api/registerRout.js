const register = require("express").Router();

const { check, validationResult } = require("express-validator");

const User = require("../../db_models/User/User");
const jwt = require("jsonwebtoken");
const config = require("config");

const bcrypt = require("bcryptjs");

register.post(
  "/",
  [
    check("name", "Name can not be empty").not().isEmpty(),
    check("password", "password must contain a minimum of 6 chars").isLength({
      min: 6,
    }),
    check("password", "password must contain a special chars and a number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .matches(/\d/),
    check("passcode", "passcode is required").not().isEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ errors: error.array() });
      return res.end();
    }
    try {
      let { name, password, passcode } = req.body;
      if (passcode !== config.get("userSecret")) {
        res.status(401).json({ errors: [{ msg: "Wrong passcode" }] });
        return res.end();
      }
      let user = await User.findOne({ name });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User Already Exist" }] });
        return res.end();
      }
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      user = new User({
        name,
        password,
      });

      await user.save();

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
            res.json({ token });
            return res.end();
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: eroor.message }] });
      return res.end();
    }
  }
);
module.exports = register;
