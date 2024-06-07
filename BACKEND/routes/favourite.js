const express = require("express");
const router = express.Router();
const User = require("../model/user");
const { authenticateToken } = require("./userAuth");

router.put("/addbooktofavourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userdata = await User.findById(id);
    const isfavourite = userdata.favourites.includes(bookid);
    if (isfavourite) {
      return res.status(200).json({ message: "book is already in favourite" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "book added to favourite" });
  } catch (error) {
    console.log(error, "at favourite");
  }
});

router.put("/removebookfromfavourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userdata = await User.findById(id);
    const isfavourite = userdata.favourites.includes(bookid);
    if (!isfavourite) {
      return res.status(400).json({ message: "book is not in favourite" });
    }
    await userdata.favourites.pull(bookid);
    await userdata.save();
    return res.status(200).json({ message: "book remove from favourite" });
  } catch (error) {
    console.log(error, "at favourite");
  }
});

router.get("/getfavouritebook", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userdata = await User.findById(id).populate("favourites");
    if (!userdata) {
      return res.status(400).json({ message: "book is not in favourite" });
    }
    const data1 = userdata.favourites;
    return res
      .status(200)
      .json({ message: "get book of  favourite", data: data1 }); //, d1: userdata
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
