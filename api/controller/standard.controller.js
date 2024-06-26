import Product from "../schema/Product.js";

export const getColor = async (req, res, next) => {
  try {
    const colors = await Product.aggregate([
      {
        $unwind: "$color",
      },
      {
        $group: {
          _id: "$color",
        },
      },
      {
        $group: {
          _id: null,
          colors: { $push: "$_id" },
        },
      },
    ]);
    res.status(200).send(colors[0].colors);
  } catch (error) {
    next(error);
  }
};

export const getTags = async (req, res, next) => {
  try {
    const tags = await Product.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
        },
      },
      {
        $group: {
          _id: null,
          tags: { $push: "$_id" },
        },
      },
    ]);
    res.status(200).send(tags[0].tags);
  } catch (error) {
    next(error);
  }
};

