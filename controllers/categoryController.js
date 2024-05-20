const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body)
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.attractionsByCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id).populate('attractions')
        res.json({ category, attractions: category.attractions });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};