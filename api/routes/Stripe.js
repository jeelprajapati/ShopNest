import express from "express";
import Stripe from "stripe";
const route = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";
import Order from "../schema/Order.js";
const Key = process.env.STRIPE_KEY;
const stripe = Stripe(Key);

route.post("/", verifyToken, async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.products.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.item,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url:
        "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/",
    });

    const order = new Order({
      userId: req.user.userid,
      products: req.body.products.map((item) => {
        return {
          productId: item._id,
          quantity: item.quantity,
        };
      }),
      total: req.body.total,
      stripeId: session.id,
      payment: session.status,
    });

    await order.save();

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    next(error);
  }
});

route.put("/session_status",verifyToken, async (req, res, next) => {
  try {
    console.log(req.query.session_id)
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    const order = await Order.findOneAndUpdate(
      { stripeId: req.query.session_id },
      { payment: session.status },
      { new: true }
    );
    res.status(201).send("Payment was successfull.")
  } catch (error) {
    next(error);
  }
});

export default route;
