const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const getAPI = await User.find();
    res.json(getAPI);
  } catch (error) {
    res.json(error);
  }
});
//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("user not found");
    const checkPass = await bcrypt.compare(req.body.password, user.password);
    !checkPass && res.status(400).json("wrong password");
    res.status(200).json(user);

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
