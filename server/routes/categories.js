const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.post('/', async(req, res) => {
    const createCat = new Category(req.body);
    try {
        const saveCreate = await createCat.save();
        res.status(200).json(saveCreate);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const delCats = await Category.findByIdAndDelete({_id:req.params.id});
        res.status(200).json("delete success");
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/', async(req, res) => {
    try {
        const find = await Category.find();
        res.status(200).json(find);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;