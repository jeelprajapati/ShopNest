import User from "../schema/User.js";
import createError from "../utils/createError.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const Register = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).send("user has been created");
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send(createError(404, "User not found!"));

    const comparePass = bcrypt.compareSync(req.body.password, user.password);
    if (!comparePass)
      return res.status(401).send(createError(401, "Invalid Username Or Password"));

    const token = Jwt.sign(
      {
        userid: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY
    );

    const { password, ...other } = user._doc;

    res.status(200).send({ token, ...other });
  } catch (error) {
    next(error);
  }
};


export const ChangePassword = async (req, res, next) => {
  try {
    const findUser = await User.findOne({ _id: req.user.userid });

    if (!findUser)
      return res.status(404).send(next(createError(404, "User not found!")));

    if (findUser.email !== req.body.email)
      return res.status(404).send(createError(404, "Invalid email address!"));

    const comparePass = bcrypt.compareSync(
      req.body.currentPassword,
      findUser.password
    );

    if (!comparePass)
      return res.status(401).send(createError(401, "Invalid current password"));

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(req.body.newPassword, salt);

    const updateUser = await User.findByIdAndUpdate(
      findUser._id,
      {
        $set: {
          password: hashPassword,
        },
      },
      { new: true }
    );

    res.status(201).send("Password changed successfully");
  } catch (error) {
    next(error);
  }
};
