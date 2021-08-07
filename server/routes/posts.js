const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//* POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});


//* UPDATE
router.put("/:id", async (req, res) => {
  const updateId = await Post.findById(req.params.id);
  if (req.body.username === updateId.username) {
    try {
      const update = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json("Update success");
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

//* DELETE
router.delete('/:id', async (req, res) => {
    const deleteId = await Post.findById(req.params.id);
    if(deleteId.username === req.body.username) {
        try {
            await deleteId.delete();
            res.status(200).json("Delete Post Success");
        } catch (error) {
            
        }
    }
})

//* GET BY ID
router.get('/:id',async (req, res) =>{
  try {
    const getById = await Post.findById(req.params.id);
    res.status(200).json(getById);
  } catch (error) {
    res.status(500).json(error);
  }
})

//* GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
