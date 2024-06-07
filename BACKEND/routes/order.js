const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Order = require("../model/order");
const { authenticateToken } = require("./userAuth");
const user = require("../model/user");

router.post("/placeorder", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const value of order) {
      const newOrder = new Order({ user: id, book: value._id });
      const orderDataFromDB = await newOrder.save();

      const userData = await User.findByIdAndUpdate(
        id,
        { $push: { orders: orderDataFromDB._id } },
        { new: true }
      );

      await User.findByIdAndUpdate(id, { $pull: { cart: value._id } });
    }

    return res.status(200).json({ message: "Orders placed successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while placing orders" });
  }
});

router.get("/getorderhistory", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const userdata = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book", options: { strictPopulate: false } },
    });

    const orderdata = userdata.orders.reverse();

    return res.json({ status: "success", data: orderdata });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching order history",
    });
  }
});

router.get("/getallorderhistory", authenticateToken, async (req, res) => {
  try {
    const order = await Order.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching order history",
    });
  }
});

router.post(
  "/updateorderstatus/:orderid",
  authenticateToken,
  async (req, res) => {
    try {
      const { orderid } = req.params;
      const { status } = req.body;

      const updatedOrder = await Order.findByIdAndUpdate(
        orderid,
        { status },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json({
        message: "Order status updated successfully",
        data: updatedOrder,
      });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while updating order status" });
    }
  }
);

module.exports = router;
