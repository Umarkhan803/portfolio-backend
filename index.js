const express = require("express");
const app = express();
const PORT = 3500;
require("./db/Config");
const cors = require("cors");
const User = require("./db/User");
const jwt = require("jsonwebtoken");
const jwtKey = "port";
app.use(express.json());
app.use(cors());

app.post("/message", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send("Something went wrong");
    }
    res.send({ result, auth: token });
    res.send("message send");
  });
});
app.listen(PORT, () => {
  console.log("server is started");
});
