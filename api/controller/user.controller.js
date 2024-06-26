import User from "../schema/User.js";
import bcrypt from "bcrypt";

//Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};
//Get single user
export const getUser = async (req, res, next) => {
  try {
    const singleUser = await User.findOne({ _id: req.params.id });

    if (!singleUser)
      return res.status(404).send(createError(404, "User Not Found"));

    res.status(200).send(singleUser);
  } catch (error) {
    next(error);
  }
};
//Update User
export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      var salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
};
//Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(201).send("User Deleted Sucesfully");
  } catch (error) {
    next(error);
  }
};
//Get user in this year

export const stats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear - 1));
  try {
    const users = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          users: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};
