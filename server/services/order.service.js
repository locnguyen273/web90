import * as mongoose from "mongoose";
import Product from "../models/products.model.js";
import Order from "../models/orders.model.js";

const createOrderService = async (req, res) => {
  try {
    const { customerId, productId, quantity } = req.body;
    const foundProduct = await Product.findById(productId);
    if (!foundProduct) return res.status(404).send({ data: null, status: false, message: "Products not found." });

    if (quantity > foundProduct.quantity) return res.status(404).send({ data: null, status: false, message: "Not enough product stock." });

    const totalPrice = quantity * foundProduct.price;
    const newOrder = new Order({ customerId, productId, quantity, totalPrice })
    await newOrder.save();

    foundProduct.quantity -= quantity;
    await foundProduct.save();
    return res
        .status(201)
        .send({ data: newOrder, status: true, message: "Order product successful." });

  } catch (error) {
    return res.status(500).send({ data: null, status: false, message: "Server error." });
  }
}

const getOrdersService = async (req, res) => {

}

export const OrderService = {
  createOrderService,
  getOrdersService,
};
