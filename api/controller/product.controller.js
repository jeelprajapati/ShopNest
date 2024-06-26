import { priceFilter, sortFilter } from "../middleware/filter.js";
import Product from "../schema/Product.js";
import createError from "../utils/createError.js";

export const getProducts = async (req, res, next) => {
  try {
    const page = req.body.page;
    const pageSize = req.body.pageSize;

    const skip = page > 0 ? (page - 1) * pageSize : 0;

    let matchStage = {};

    if (req.query.category !== "" && req.query.category) {
      matchStage = {
        ...matchStage,
        "category.name":req.query.category
      };
    }
    if (req.query.subCategory !== "" && req.query.subCategory) {
      matchStage={
        ...matchStage,
        "category.subCategory":req.query.subCategory
      };
    }

    if (req.body.color !== "" && req.body.color) {
      matchStage.color = {
        $regex: new RegExp(req.body.color, "i"),
      };
    }

    if (req.body.tag !== "" && req.body.tag) {
      matchStage.tags = {
        $regex: new RegExp(req.body.tag, "i"),
      };
    }


    const allProduct = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $sort: sortFilter(req.body.sortBy),
      },
      {
        $match: {
          ...priceFilter(req.body.price),
          ...matchStage,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: pageSize,
      },
      {
        $project:{
          item:1,
          image:1,
          price:1,
          favorite:1
        }
      }
    ]);

    res.status(200).send(allProduct);
  } catch (error) {
    next(error);
  }
};

export const searchProduct = async (req, res, next) => {
  try {
    const search = req.body.search;
    const page = req.body.page;
    const pageSize = req.body.pageSize;

    const skip = page > 0 ? (page - 1) * pageSize : 0;

    const searchProduct = await Product.aggregate([
      {
        $match: {
          item: {
            $regex: new RegExp(search, "i"),
          },
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: pageSize,
      },
      {
        $project:{
          item:1,
          image:1,
          price:1,
          favorite:1
        }
      }
    ]);

    res.status(200).send(searchProduct);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne({ _id: req.params.id });
    if (!singleProduct)
      return res.status(404).send(createError(404, "Item Not Found"));
    res.status(200).send(singleProduct);
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  const newProduct = new Product({
    ...req.body,
  });
  try {
    const saveProduct = await newProduct.save();
    res.status(201).send("Item Added Successfully");
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const deleteProoduct = await Product.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(201).send("Product Deleted Successfully.");
  } catch (error) {
    next(error);
  }
};

export const addInFavorite = async (req, res, next) => {
  try {
    const userId = req.user.userid;
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId });
    if (!product)
      return res.status(404).send(createError(404, "Product not found!"));

    if (product.favorite.includes(userId)) {
      const updateProduct = await product.updateOne({
        $pull: { favorite: userId },
      });
      return res.status(201).send("Product removed from favorite");
    } else {
      const updateProduct = await product.updateOne({
        $push: { favorite: userId },
      });
      return res.status(201).send("Product added into favorite");
    }
  } catch (error) {
    next(error);
  }
};

export const getFavoriteByUserid = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      {
        $unwind: "$favorite",
      },
      {
        $match: {
          favorite: req.user.userid,
        },
      },
      {
        $project:{
          item:1,
          image:1,
          price:1,
          favorite:1,
        }
      }
    ]);
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};
