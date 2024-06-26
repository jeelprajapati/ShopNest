import Order from "../schema/Order.js";
import createError from "../utils/createError.js";

export const getOrders = async (req, res, next) => {
  try {
    const allOrder = await Order.find();
    res.status(200).send(allOrder);
  } catch (error) {
    next(error);
  }
};
export const getOrder = async (req, res, next) => {
  try {
    const singleOrder = await Order.findOne({ _id: req.params.id });
    if (!singleOrder)
      return res.status(404).send(createError(404, "Item Not Found"));
    res.status(200).send(singleOrder);
  } catch (error) {
    next(error);
  }
};
export const getOrderByUserId = async (req, res, next) => {
  try {
    const allOrder = await Order.find({ userId: req.user.userid })
    res.status(200).send(allOrder);
  } catch (error) {
    next(error);
  }
};
export const addOrder = async (req, res, next) => {
  const newOrder = new Order({
    userId: req.user.userid,
    ...req.body,
  });
  try {
    const saveOrder = await newOrder.save();
    res.status(201).send("Order Added Sucessfully");
  } catch (error) {
    next(error);
  }
};
export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    next(error);
  }
};
export const deleteOrder = async (req, res, next) => {
  try {
    const deleteOrder = await Order.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(201).send("Order Deleted Sucesfully");
  } catch (error) {
    next(error);
  }
};
export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).send(createError(404, "Order Not Found"));

    if (order.userId !== req.user.userid)
      return res
        .status(403)
        .send(createError(403, "You can cancel order only on cart!"));

    const cancelOrder = await Order.findByIdAndUpdate(
      order._id,
      {
        $set: {
          status: "Cancel",
        },
      },
      { new: true }
    );
    res.status(200).send(cancelOrder);
  } catch (error) {
    next(error);
  }
};

export const income = async (req, res, next) => {
  const productId=req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project:{
          month:{ $month: "$createdAt"},
          sales:"$total"
        }
      },
      {
        $group:{
          _id:"$month",
          total:{ $sum:"$sales"}
        }
      }
    ]);

    res.status(200).json(income);
  } catch (error) {
    next(error);
  }
};
