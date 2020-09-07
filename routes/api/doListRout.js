const dolist = require("express").Router();
const auth = require("../auth/auth_middleware");
const DoList = require("../../db_models/Dolist/doList");
const { check, validationResult } = require("express-validator");

dolist.post(
  "/",
  auth,
  [
    check("heading", "Heading can not be empty").not().isEmpty(),
    check("content", "Content can not be empty").not().isEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ errors: error.array() });
      return res.end();
    }
    try {
      const { heading, content, isDone, priority, category } = req.body;
      let item = await DoList.findOne({ heading });
      if (item) {
        return res.send("heading already exist, please change the heading");
      }
      let user = req.user.id;
      item = new DoList({
        user,
        heading,
        content,
        isDone,
        priority,
      });
      await item.save();
      res.status(200).json({ msg: "Item Added" });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ errors: [{ msg: error.message }] });
      res.end();
    }
  }
);

dolist.get("/", auth, async (req, res) => {
  try {
    let id = req.user.id;
    const doList = await DoList.find({ user: id });
    res.status(200).json({ doList });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ errors: [{ msg: error.message }] });
    res.end();
  }
});
dolist.delete("/:id", auth, async (req, res) => {
  try {
    let id = req.user.id;
    item = await DoList.findOneAndDelete({
      _id: req.params.id,
      user: id,
    });
    if (!item) {
      res.status(400).json({ errors: [{ msg: "Item not found" }] });
      return res.end();
    }
    res.status(200).json({ errors: [{ msg: "Item Deleted" }] });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ errors: [{ msg: error.message }] });
    return res.end();
  }
});
dolist.put(
  "/",
  [
    check("heading", "Heading can not be empty").not().isEmpty(),
    check("content", "Content can not be empty").not().isEmpty(),
    check("category", "Category can not be empty").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    try {
      let id = req.user.id;
      const { item_id, heading, content, isDone, priority } = req.body;
      const item = await DoList.findOne({ _id: item_id, user: id }).select(
        "-_id"
      );
      const fields = { heading, content, isDone, priority, category };
      if (!item) {
        res.status(400).json({ error: "ERROR" });
        return res.end();
      }
      await DoList.findOneAndUpdate({ _id: item_id }, fields);
      new_item = await DoList.findOne({ _id: item_id }).select("-_id");
      if (!new_item) {
        res.status(400).json({ errors: [{ msg: "ERROR" }] });
        return res.end();
      }
      res.status(200).json({ new_item });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ errors: [{ msg: error.message }] });
      return res.end();
    }
  }
);
module.exports = dolist;
