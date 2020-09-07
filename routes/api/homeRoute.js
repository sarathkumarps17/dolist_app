const home = require("express").Router();
const auth = require("../auth/auth_middleware");
const DoList = require("../../db_models/Dolist/doList");

home.get("/", auth, async (req, res) => {
  try {
    const collection = await DoList.find().select("-password");
    res.json(collection);
    return res.end();
  } catch (error) {
    res.status(404).json({ errors: [{ msg: error.message }] });
    return res.end();
  }
});

module.exports = home;
