const admin = require("express").Router();
const auth = require("../auth/auth_middleware");
const DoList = require("../../db_models/Dolist/doList");

admin.put("/", auth, async (req, res) => {
  try {
    const { item_id, isDone } = req.body;
    const item = await DoList.findOne({ _id: item_id }).select("-_id");
    if (!item) {
      res.status(400).json({ error: "ERROR" });
      return res.end();
    }
    await DoList.findOneAndUpdate({ _id: item_id }, { isDone });
    new_item = await DoList.findOne({ _id: item_id }).select("-_id");
    if (!new_item) {
      res.status(400).json({ errors: [{ msg: "ERROR" }] });
      return res.end();
    }
    res.status(200).json({ ...new_item });
    res.end();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

module.exports = admin;
