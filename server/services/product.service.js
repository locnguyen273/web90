import Product from "../models/products.model.js";

const createProductService = async (req, res) => {
  const { name, price, quantity } = req.body;
  const foundProduct = await Product.findOne({ name });
  try {
    if (!name || !price || !quantity) {
      return res
        .status(404)
        .send({ data: null, status: false, message: "All field is required." });
    }

    if (foundProduct) {
      return res
        .status(404)
        .send({ data: null, status: false, message: "Product is existed." });
    } else {
      const data = await Product.create(req.body);
      return res
        .status(201)
        .send({ data: data, status: true, message: "Created successful." });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ data: null, status: false, message: "Server error." });
  }
};

const getAllProductsService = async (req, res) => {
  try {
    const data = await Product.find();
    if (!data) {
      return res
        .status(404)
        .send({ data: [], status: false, message: "Products not found." });
    } else {
      return res
        .status(200)
        .send({ data: data, status: true, message: "Success." });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ data: null, status: false, message: "Server error." });
  }
};

export const ProductService = {
  createProductService,
  getAllProductsService,
};
