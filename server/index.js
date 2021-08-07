const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const categoryRoutes = require("./routes/categories");
const app = express();
app.use(express.json());
const port = 5000;
app.use("/images", express.static(path.join(__dirname, "/images")));

app.get("/", (req, res) => {
  res.send("hello node js");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/categories", categoryRoutes);
const url = "mongodb+srv://quochuy:quochuy123@cluster0.jo9kh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  () => console.log("Connect Success !")
);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
