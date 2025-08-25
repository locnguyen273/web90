import { ProductService } from "../services/product.service.js";

const createNewProduct = (req, res) => {
  return ProductService.createProductService(req, res);
}

const getAllProducts = (req, res) => {
  return ProductService.getAllProductsService(req, res);
}

export const ProductController = {
  createNewProduct,
  getAllProducts,
}
