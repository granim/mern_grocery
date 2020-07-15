const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");

// @route  GET api/items
// @desc   Get All itmes
// @access Public
router.get("/", (req, res) => {
  //const items = await Item.find();
  // Or
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route  POST api/items
// @desc   Create A Post
// @access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  // await newItem.save();
  //or
  newItem.save().then((item) => res.json(item));
});

// @route  Delete api/items
// @desc   Delete A Post
// @access Public
router.delete("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(400).send("Could not find a itme with that ID");
  try {
    await item.remove();
    res.send(item);
  } catch (error) {
    res.send({ message: "Sorry could not find that id" });
  }
});

module.exports = router;
