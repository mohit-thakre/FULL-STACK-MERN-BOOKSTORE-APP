const express = require("express");
const app = express();
const connectdb = require("./connection/connect");
const route = require("./routes/user");
const route1 = require("./routes/book");
const route2 = require("./routes/favourite");
const route3 = require("./routes/cart");
const route4 = require("./routes/order");
const cors = require("cors");

require("dotenv").config();
app.use(cors());
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server started");
});

app.get("/", (req, res) => {
  res.send("hello from backend side");
});

app.use(express.json());

app.use("/api/v1/book", route);
app.use("/api/v1/book", route2);
app.use("/api/v1/book", route3);
app.use("/api/v1/book", route4);
app.use("/api/v1/book", route1);
connectdb();
