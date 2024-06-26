import Category from "../schema/Category.js";

export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    res.status(200).send(category);
  } catch (error) {
    next(error);
  }
};
export const addCategory = async (req, res, next) => {
  try {
    const findCategory = await Category.findOne({
      category: req.body.category,
    });

    if (findCategory) return res.status(500).send("Category already exists!");

    const newCategory = new Category({
      ...req.body,
    });

    await newCategory.save();

    res.status(201).send("Category added successfully.");
  } catch (error) {
    next(error);
  }
};
