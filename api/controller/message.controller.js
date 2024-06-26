import Message from "../schema/Message.js";
import createError from "../utils/createError.js";

export const sendMessage = async (req, res, next) => {
  try {
    const newMessage = new Message({
      ...req.body,
    });
    await newMessage.save();
    res.status(201).send("Message sended successfully.");
  } catch (error) {
    next(error);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).send(messages);
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).send(createError(404,"Message not found!"));
    res.status(200).send(message);
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const deleteMessage = await Message.findByIdAndDelete(req.params.id);
    res.status(201).send("Message deleted successfully.");
  } catch (error) {
    next(error);
  }
};
